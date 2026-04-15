// server/api/admin/rebuild-status.get.ts
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import type { BuildStatus } from '~~/types/rebuild'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user?.isAdmin) {
    throw createError({ 
      statusCode: 403, 
      statusMessage: 'Admin access required' 
    })
  }

  const BUILD_STATUS_FILE = join(process.cwd(), 'tmp', 'build-status.json')
  
  try {
    if (existsSync(BUILD_STATUS_FILE)) {
      const status: BuildStatus = JSON.parse(readFileSync(BUILD_STATUS_FILE, 'utf-8'))
      return {
        ok: true,
        success: status.status === 'success',
        data: status
      }
    }
    
    return {
      ok: false,
      message: 'No build status available'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read build status',
      data: { error: (error as Error).message }
    })
  }
})