import type { EventUpdateResponse } from "~/models/EventsData"

export default defineEventHandler(async (event): Promise<EventUpdateResponse> => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  console.log(body)

  try {
    const response = await $fetch(`/api/events`, {
      baseURL: 'https://api.goldengatemanor.com',
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return response as EventUpdateResponse
  } catch (error: unknown) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update event'
    })
  }
})