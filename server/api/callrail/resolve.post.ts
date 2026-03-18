import { readBody } from 'h3'
import { resolveCallRailTargets } from '~/../server/utils/callrail'

interface ResolveBody {
  targets?: string[]
  landing?: string
  referrer?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ResolveBody>(event)

  return await resolveCallRailTargets(event, {
    targets: body?.targets || [],
    landing: body?.landing,
    referrer: body?.referrer
  })
})