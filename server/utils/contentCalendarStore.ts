import { promises as fs } from 'node:fs'
import path from 'node:path'

export type ContentCalendarRecord = {
  key: string
  csv: string
  createdAt: string
  updatedAt: string
}

type StoreShape = Record<string, ContentCalendarRecord>

function log(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log('[contentCalendarStore]', ...args)
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

async function statIfExists(p: string) {
  try {
    const st = await fs.stat(p)
    return { exists: true, size: st.size, mtime: st.mtime.toISOString() }
  } catch {
    return { exists: false }
  }
}

async function ensureFile() {
  log('--- ensureFile() ---')
  log('cwd:', process.cwd())
  log('PROJECT_ROOT:', PROJECT_ROOT)
  log('FILE_PATH:', FILE_PATH)
  log('FILE_STAT(before):', await statIfExists(FILE_PATH))

  try {
    await fs.access(FILE_PATH)
    log('ensureFile: file exists')
  } catch (e) {
    log('ensureFile: file missing, creating...', (e as Error)?.message || e)
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2), 'utf8')
    log('ensureFile: created file')
  }

  log('FILE_STAT(after):', await statIfExists(FILE_PATH))
}

async function readStore(): Promise<StoreShape> {
  log('--- readStore() ---')
  await ensureFile()

  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8')
    log('readStore: read bytes:', raw.length)

    const parsed = JSON.parse(raw) as StoreShape
    const ok = parsed && typeof parsed === 'object'
    log('readStore: parsed ok:', ok)

    const keys = ok ? Object.keys(parsed) : []
    log('readStore: keys count:', keys.length)
    if (keys.length) log('readStore: keys sample:', keys.slice(0, 10))

    return ok ? parsed : {}
  } catch (e) {
    log('readStore: FAILED:', (e as Error)?.message || e)
    return {}
  }
}

async function writeStore(store: StoreShape) {
  log('--- writeStore() ---')
  await ensureFile()

  const tmp = `${FILE_PATH}.tmp`
  const payload = JSON.stringify(store, null, 2)

  log('writeStore: tmp:', tmp)
  log('writeStore: payload bytes:', payload.length)
  log('writeStore: FILE_STAT(before):', await statIfExists(FILE_PATH))
  log('writeStore: TMP_STAT(before):', await statIfExists(tmp))

  await fs.writeFile(tmp, payload, 'utf8')
  log('writeStore: wrote tmp')
  log('writeStore: TMP_STAT(after write):', await statIfExists(tmp))

  await fs.rename(tmp, FILE_PATH)
  log('writeStore: renamed tmp -> file')
  log('writeStore: FILE_STAT(after):', await statIfExists(FILE_PATH))
  log('writeStore: TMP_STAT(after rename):', await statIfExists(tmp))
}

export function isValidCalendarKey(key: string) {
  return /^[0-9]{4}-[0-9]{2}$/.test(key)
}

export async function listCalendars() {
  log('=== listCalendars() ===')
  const store = await readStore()
  const items = Object.values(store)
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map(({ key, createdAt, updatedAt }) => ({ key, createdAt, updatedAt }))
  log('listCalendars: count:', items.length)
  return items
}

export async function getCalendar(key: string) {
  log('=== getCalendar() ===', key)
  const store = await readStore()
  const rec = store[key] ?? null
  log('getCalendar: found:', Boolean(rec))
  if (rec) log('getCalendar: csvLen:', rec.csv?.length ?? 0)
  return rec
}

export async function upsertCalendar(key: string, csv: string) {
  log('=== upsertCalendar() ===', key)
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

  log('upsertCalendar: OK', { key, csvLen: csv.length })
  return record
}

export async function deleteCalendar(key: string) {
  log('=== deleteCalendar() ===', key)
  const store = await readStore()

  if (!Object.prototype.hasOwnProperty.call(store, key)) {
    log('deleteCalendar: NOT FOUND', key)
    return false
  }

  const { [key]: _removed, ...rest } = store
  await writeStore(rest)

  log('deleteCalendar: OK', key)
  return true
}