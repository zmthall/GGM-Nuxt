// server/api/admin/rebuild-clear.post.ts
import { existsSync, unlinkSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  
  if (!user?.isAdmin) {
    throw createError({ statusCode: 403 })
  }

  const BUILD_STATUS_FILE = join(process.cwd(), 'tmp', 'build-status.json')
  
  if (existsSync(BUILD_STATUS_FILE)) {
    unlinkSync(BUILD_STATUS_FILE)
    return { ok: true, message: 'Build status cleared' }
  }
  
  return { ok: true, message: 'No build status to clear' }
})