import { promises as fs } from 'node:fs'
import path from 'node:path'

export type ContentCalendarRecord = {
  key: string
  csv: string
  createdAt: string
  updatedAt: string
}

type StoreShape = Record<string, ContentCalendarRecord>

/**
 * Debug enable options:
 * 1) ENV: CALENDAR_STORE_DEBUG=1
 * 2) File flag: <projectRoot>/tmp/calendar-store-debug.txt exists
 *
 * The file flag is nice because you can toggle it on/off without redeploying.
 */
async function isDebugEnabled(projectRoot: string) {
  if (process.env.CALENDAR_STORE_DEBUG === '1') return true
  try {
    await fs.access(path.join(projectRoot, 'tmp', 'calendar-store-debug.txt'))
    return true
  } catch {
    return false
  }
}

function safeStr(v: unknown) {
  try {
    if (typeof v === 'string') return v
    return JSON.stringify(v)
  } catch {
    return String(v)
  }
}

/**
 * Attempt to locate the *project root* even when running from Nitro output.
 * - If cwd contains "/.output/", treat everything before that as the project root.
 * - Otherwise just use cwd.
 */
function getProjectRoot() {
  const cwd = process.cwd()
  const marker = `${path.sep}.output${path.sep}`
  const idx = cwd.lastIndexOf(marker)
  return idx === -1 ? cwd : cwd.slice(0, idx)
}

const PROJECT_ROOT = getProjectRoot()
const FILE_PATH = path.join(PROJECT_ROOT, 'server', 'data', 'content-calendars.json')

async function log(...args: unknown[]) {
  const enabled = await isDebugEnabled(PROJECT_ROOT)
  if (!enabled) return
  // eslint-disable-next-line no-console
  console.log('[contentCalendarStore]', ...args)
}

async function statIfExists(p: string) {
  try {
    const st = await fs.stat(p)
    return {
      exists: true,
      size: st.size,
      mtime: st.mtime.toISOString()
    }
  } catch {
    return { exists: false }
  }
}

async function ensureFile() {
  await log('--- ensureFile() ---')
  await log('cwd:', process.cwd())
  await log('PROJECT_ROOT:', PROJECT_ROOT)
  await log('FILE_PATH:', FILE_PATH)
  await log('FILE_STAT(before):', await statIfExists(FILE_PATH))

  try {
    await fs.access(FILE_PATH)
    await log('ensureFile: file exists')
  } catch (e) {
    await log('ensureFile: file missing, creating...', safeStr((e as Error)?.message || e))
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2), 'utf8')
    await log('ensureFile: created file')
  }

  await log('FILE_STAT(after):', await statIfExists(FILE_PATH))
}

async function readStore(): Promise<StoreShape> {
  await log('--- readStore() ---')
  await ensureFile()

  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8')
    await log('readStore: read bytes:', raw.length)

    const parsed = JSON.parse(raw) as StoreShape
    const ok = parsed && typeof parsed === 'object'
    await log('readStore: parsed ok:', ok)

    const keys = ok ? Object.keys(parsed) : []
    await log('readStore: keys count:', keys.length)
    if (keys.length > 0) await log('readStore: keys sample:', keys.slice(0, 10))

    return ok ? parsed : {}
  } catch (e) {
    await log('readStore: FAILED:', safeStr((e as Error)?.message || e))
    return {}
  }
}

async function writeStore(store: StoreShape) {
  await log('--- writeStore() ---')
  await ensureFile()

  const tmp = `${FILE_PATH}.tmp`
  const payload = JSON.stringify(store, null, 2)

  await log('writeStore: tmp:', tmp)
  await log('writeStore: payload bytes:', payload.length)
  await log('writeStore: FILE_STAT(before):', await statIfExists(FILE_PATH))
  await log('writeStore: TMP_STAT(before):', await statIfExists(tmp))

  try {
    await fs.writeFile(tmp, payload, 'utf8')
    await log('writeStore: wrote tmp')
    await log('writeStore: TMP_STAT(after write):', await statIfExists(tmp))

    await fs.rename(tmp, FILE_PATH)
    await log('writeStore: renamed tmp -> file')
    await log('writeStore: FILE_STAT(after):', await statIfExists(FILE_PATH))
    await log('writeStore: TMP_STAT(after rename):', await statIfExists(tmp))
  } catch (e) {
    await log('writeStore: FAILED:', safeStr((e as Error)?.message || e))
    throw e
  }
}

export function isValidCalendarKey(key: string) {
  return /^[0-9]{4}-[0-9]{2}$/.test(key)
}

export async function listCalendars() {
  await log('=== listCalendars() ===')
  const store = await readStore()
  const items = Object.values(store)
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map(({ key, createdAt, updatedAt }) => ({ key, createdAt, updatedAt }))

  await log('listCalendars: count:', items.length)
  return items
}

export async function getCalendar(key: string) {
  await log('=== getCalendar() ===', key)
  const store = await readStore()
  const rec = store[key] ?? null
  await log('getCalendar: found:', Boolean(rec))
  if (rec) await log('getCalendar: csvLen:', rec.csv?.length ?? 0)
  return rec
}

export async function upsertCalendar(key: string, csv: string) {
  await log('=== upsertCalendar() ===', key)
  const store = await readStore()
  const now = new Date().toISOString()

  const existing = store[key]
  const record: ContentCalendarRecord = {
    key,
    csv,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  }

  store[key] = record
  await writeStore(store)

  await log('upsertCalendar: OK', { key, csvLen: csv.length })
  return record
}

export async function deleteCalendar(key: string) {
  await log('=== deleteCalendar() ===', key)
  const store = await readStore()

  if (!Object.prototype.hasOwnProperty.call(store, key)) {
    await log('deleteCalendar: NOT FOUND', key)
    return false
  }

  const { [key]: _removed, ...rest } = store
  await writeStore(rest)

  await log('deleteCalendar: OK', key)
  return true
}
