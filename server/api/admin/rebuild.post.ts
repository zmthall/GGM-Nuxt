// server/api/admin/rebuild.post.ts
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'

const execAsync = promisify(exec)

interface BuildStatus {
  id: string
  status: 'running' | 'success' | 'failed'
  startedAt: string
  completedAt?: string
  message?: string
  error?: string
  logs?: string[]
}

const BUILD_STATUS_FILE = join(process.cwd(), 'tmp', 'build-status.json')

function saveBuildStatus(status: BuildStatus) {
  const tmpDir = dirname(BUILD_STATUS_FILE)
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir, { recursive: true })
  }
  writeFileSync(BUILD_STATUS_FILE, JSON.stringify(status, null, 2))
}

function getBuildStatus(): BuildStatus | null {
  try {
    if (existsSync(BUILD_STATUS_FILE)) {
      return JSON.parse(readFileSync(BUILD_STATUS_FILE, 'utf-8'))
    }
  } catch (e) {
    console.error('Error reading build status:', e)
  }
  return null
}

async function runBuildProcess(buildId: string) {
  const logs: string[] = []
  
  try {
    const appRoot = process.cwd()
    const execOptions = {
      cwd: appRoot,
      timeout: 600000,
      maxBuffer: 1024 * 1024 * 10,
      env: {
        ...process.env,
        PATH: `/opt/plesk/node/22/bin:${process.env.PATH}`
      }
    }
    
    logs.push('Rebuilding native modules for Node 22...')
    saveBuildStatus({
      id: buildId,
      status: 'running',
      startedAt: new Date().toISOString(),
      logs: [...logs]
    })
    
    const { stdout: rebuildOut } = await execAsync('npm rebuild better-sqlite3', execOptions)
    logs.push('Native modules rebuilt')
    if (rebuildOut.trim()) logs.push(rebuildOut)
    
    saveBuildStatus({
      id: buildId,
      status: 'running',
      startedAt: new Date().toISOString(),
      logs: [...logs]
    })
    
    logs.push('Starting build...')
    const { stdout, stderr } = await execAsync('npm run build', execOptions)
    logs.push('Build completed successfully')
    if (stdout.trim()) logs.push(stdout)
    if (stderr && stderr.trim()) logs.push(`Warnings: ${stderr}`)
    
    saveBuildStatus({
      id: buildId,
      status: 'running',
      startedAt: new Date().toISOString(),
      logs: [...logs]
    })
    
    logs.push('Triggering app restart...')
    const restartFile = join(appRoot, 'tmp', 'restart.txt')
    const tmpDir = dirname(restartFile)
    
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true })
    }
    
    writeFileSync(restartFile, new Date().toISOString())
    logs.push('Restart triggered')
    
    saveBuildStatus({
      id: buildId,
      status: 'success',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      message: 'Build complete! App is restarting...',
      logs
    })
    
  } catch (error) {
    console.error('Build failed:', error)
    logs.push(`ERROR: ${(error as Error).message}`)
    
    saveBuildStatus({
      id: buildId,
      status: 'failed',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      error: (error as Error).message,
      logs
    })
  }
}

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

  // Check if a build is already running
  const currentStatus = getBuildStatus()
  if (currentStatus && currentStatus.status === 'running') {
    return {
      ok: false,
      message: 'A build is already in progress',
      buildId: currentStatus.id,
      status: currentStatus
    }
  }

  // Generate build ID
  const buildId = `build-${Date.now()}`
  
  // Initialize build status
  saveBuildStatus({
    id: buildId,
    status: 'running',
    startedAt: new Date().toISOString(),
    logs: ['Build started...']
  })
  
  // Run build in background (don't await)
  runBuildProcess(buildId).catch(err => {
    console.error('Unexpected error in build process:', err)
  })
  
  // Return immediately
  return {
    ok: true,
    message: 'Build started in background',
    buildId,
    statusUrl: '/api/admin/rebuild-status'
  }
})