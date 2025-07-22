import type { EventUpdateResponse } from "~/models/EventsData"

export default defineEventHandler(async (event): Promise<EventUpdateResponse> => {
  const config = useRuntimeConfig()
  const eventId = getRouterParam(event, 'id')
  const body = await readBody(event)

  try {
    const response = await $fetch(`/api/events/${eventId}`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'PUT',
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return response
  } catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update event'
    })
  }
})