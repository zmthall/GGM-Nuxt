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

function getExecOptions() {
  const nodeBinDir = dirname(process.execPath)

  return {
    cwd: process.cwd(),
    timeout: 600000,
    maxBuffer: 1024 * 1024 * 10,
    env: {
      ...process.env,
      PATH: `${nodeBinDir}:${process.env.PATH ?? ''}`
    }
  }
}

function updateRunningStatus(buildId: string, startedAt: string, logs: string[]) {
  saveBuildStatus({
    id: buildId,
    status: 'running',
    startedAt,
    logs: [...logs]
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getStringProperty(obj: Record<string, unknown>, key: string): string | undefined {
  const value = obj[key]

  if (typeof value === 'string' && value.trim()) {
    return value
  }

  return undefined
}

function getErrorDetails(error: unknown) {
  let message = 'Unknown error'
  let stdout: string | undefined
  let stderr: string | undefined

  if (error instanceof Error && error.message.trim()) {
    message = error.message
  }

  if (isRecord(error)) {
    const recordMessage = getStringProperty(error, 'message')
    const recordStdout = getStringProperty(error, 'stdout')
    const recordStderr = getStringProperty(error, 'stderr')

    if (recordMessage) {
      message = recordMessage
    }

    if (recordStdout) {
      stdout = recordStdout
    }

    if (recordStderr) {
      stderr = recordStderr
    }
  }

  return {
    message,
    stdout,
    stderr
  }
}

async function runCommand(command: string, execOptions: ReturnType<typeof getExecOptions>, logs: string[], buildId: string, startedAt: string) {
  logs.push(`$ ${command}`)
  updateRunningStatus(buildId, startedAt, logs)

  const { stdout, stderr } = await execAsync(command, execOptions)

  if (stdout?.trim()) {
    logs.push(stdout.trim())
  }

  if (stderr?.trim()) {
    logs.push(`Warnings:\n${stderr.trim()}`)
  }
}

async function runBuildProcess(buildId: string) {
  const logs: string[] = []
  const startedAt = new Date().toISOString()

  try {
    const appRoot = process.cwd()
    const execOptions = getExecOptions()

    logs.push(`Using Node runtime: ${process.execPath}`)
    logs.push(`Node version: ${process.version}`)
    updateRunningStatus(buildId, startedAt, logs)

    await runCommand('node -v', execOptions, logs, buildId, startedAt)
    await runCommand('npm -v', execOptions, logs, buildId, startedAt)

    logs.push('Rebuilding native modules for current Node runtime...')
    updateRunningStatus(buildId, startedAt, logs)
    await runCommand('npm rebuild better-sqlite3', execOptions, logs, buildId, startedAt)

    logs.push('Starting build...')
    updateRunningStatus(buildId, startedAt, logs)
    await runCommand('npm run build', execOptions, logs, buildId, startedAt)

    logs.push('Triggering app restart...')
    updateRunningStatus(buildId, startedAt, logs)

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
      startedAt,
      completedAt: new Date().toISOString(),
      message: 'Build complete. Waiting for app restart...',
      logs
    })
  } catch (error: unknown) {
    const errorDetails = getErrorDetails(error)

    console.error('Build failed:', error)

    logs.push(`ERROR: ${errorDetails.message}`)

    if (errorDetails.stdout) {
      logs.push(`STDOUT:\n${errorDetails.stdout}`)
    }

    if (errorDetails.stderr) {
      logs.push(`STDERR:\n${errorDetails.stderr}`)
    }

    saveBuildStatus({
      id: buildId,
      status: 'failed',
      startedAt,
      completedAt: new Date().toISOString(),
      error: errorDetails.message,
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

  const currentStatus = getBuildStatus()

  if (currentStatus && currentStatus.status === 'running') {
    return {
      ok: false,
      message: 'A build is already in progress',
      buildId: currentStatus.id,
      status: currentStatus
    }
  }

  const buildId = `build-${Date.now()}`

  saveBuildStatus({
    id: buildId,
    status: 'running',
    startedAt: new Date().toISOString(),
    logs: ['Build started...']
  })

  runBuildProcess(buildId).catch((err) => {
    console.error('Unexpected error in build process:', err)
  })

  return {
    ok: true,
    message: 'Build started in background',
    buildId,
    statusUrl: '/api/admin/rebuild-status'
  }
})