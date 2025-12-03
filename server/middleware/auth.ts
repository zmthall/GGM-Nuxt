// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  // Only check auth for /api/admin routes
  if (!event.path.startsWith('/api/admin')) {
    return
  }

  const authHeader = getRequestHeader(event, 'authorization')
  
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing authorization header'
    })
  }

  try {
    // Call your API to verify
    const verifyResponse = await $fetch<{success: boolean; isAdmin: boolean; uid: string; email: string;}>('/api/verify/admin', {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    })
    
    if (!verifyResponse.success || !verifyResponse.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Admin access required'
      })
    }
    
    // Set user context for use in handlers
    event.context.user = {
      uid: verifyResponse.uid,
      email: verifyResponse.email,
      isAdmin: true
    }
  } catch (error) {
    console.error('Auth verification failed:', error)
    throw createError({
      statusMessage: (error as Error).message || 'Invalid or expired token'
    })
  }
})