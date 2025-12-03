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
    
    console.log('Starting build...')
    const { stdout, stderr } = await execAsync('npm run build', { 
      cwd: appRoot,
      timeout: 600000, // 10 minutes (600,000 ms)
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer for large build output
    })
    
    console.log('Build output:', stdout)
    if (stderr) console.warn('Build warnings:', stderr)
    
    console.log('Triggering app restart...')
    
    // Cross-platform restart trigger
    const restartFile = join(appRoot, 'tmp', 'restart.txt')
    const tmpDir = dirname(restartFile)
    
    // Ensure tmp directory exists
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true })
    }
    
    // Create/touch the restart file (works on Windows and Linux)
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