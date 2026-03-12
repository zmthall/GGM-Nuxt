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

  const startedAt = new Date(Date.now() - (process.uptime() * 1000)).toISOString()

  return {
    ok: true,
    runtime: {
      pid: process.pid,
      nodeVersion: process.version,
      startedAt,
      marker: `${process.pid}-${startedAt}`
    }
  }
})