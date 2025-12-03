// server/api/admin/rebuild.post.ts
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'

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
    const execOptions = {
      cwd: appRoot,
      timeout: 600000,
      maxBuffer: 1024 * 1024 * 10,
      env: {
        ...process.env,
        PATH: `/opt/plesk/node/22/bin:${process.env.PATH}` // Changed from 20 to 22!
      }
    }
    
    console.log('Rebuilding native modules for Node 22...')
    const { stdout: rebuildOut } = await execAsync('npm rebuild better-sqlite3', execOptions)
    console.log('Rebuild output:', rebuildOut)
    
    console.log('Starting build...')
    const { stdout, stderr } = await execAsync('npm run build', execOptions)
    
    console.log('Build output:', stdout)
    if (stderr) console.warn('Build warnings:', stderr)
    
    console.log('Triggering app restart...')
    
    const restartFile = join(appRoot, 'tmp', 'restart.txt')
    const tmpDir = dirname(restartFile)
    
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true })
    }
    
    writeFileSync(restartFile, new Date().toISOString())
    
    return { 
      ok: true, 
      message: 'Build complete! App is restarting...',
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Build failed:', error)
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Build failed',
      data: { 
        error: (error as Error).message
      }
    })
  }
})