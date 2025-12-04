// server/api/admin/git-pull.post.ts
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'Not authenticated' 
    })
  }
  
  if (!user.isAdmin) {
    throw createError({ 
      statusCode: 403, 
      statusMessage: 'Admin access required' 
    })
  }

  try {
    const appRoot = process.cwd()
    
    console.log('Pulling latest code from Git...')
    const { stdout, stderr } = await execAsync('git pull', {
      cwd: appRoot,
      timeout: 60000, // 1 minute timeout
      env: {
        ...process.env,
        PATH: `/opt/plesk/node/22/bin:${process.env.PATH}`
      }
    })
    
    console.log('Git pull output:', stdout)
    if (stderr) console.warn('Git pull warnings:', stderr)
    
    return {
      ok: true,
      message: 'Code updated successfully',
      output: stdout,
      warnings: stderr || null
    }
  } catch (error) {
    console.error('Git pull failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Git pull failed',
      data: {
        error: (error as Error).message
      }
    })
  }
})