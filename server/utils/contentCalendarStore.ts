import { promises as fs } from 'node:fs'
import path from 'node:path'

export type ContentCalendarRecord = {
  key: string
  csv: string
  createdAt: string
  updatedAt: string
}

type StoreShape = Record<string, ContentCalendarRecord>

const FILE_PATH = path.resolve(process.cwd(), 'server', 'data', 'content-calendars.json')

async function ensureFile() {
  try {
    await fs.access(FILE_PATH)
  } catch {
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify({}, null, 2), 'utf8')
  }
}

async function readStore(): Promise<StoreShape> {
  await ensureFile()
  const raw = await fs.readFile(FILE_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw) as StoreShape
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

async function writeStore(store: StoreShape) {
  await ensureFile()
  const tmp = `${FILE_PATH}.tmp`
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), 'utf8')
  await fs.rename(tmp, FILE_PATH)
}

export function isValidCalendarKey(key: string) {
  return /^[0-9]{4}-[0-9]{2}$/.test(key)
}

export async function listCalendars() {
  const store = await readStore()
  const items = Object.values(store)
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map(({ key, createdAt, updatedAt }) => ({ key, createdAt, updatedAt }))
  return items
}

export async function getCalendar(key: string) {
  const store = await readStore()
  return store[key] ?? null
}

export async function upsertCalendar(key: string, csv: string) {
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
  return record
}

export async function deleteCalendar(key: string) {
  const store = await readStore()
  if (!Object.prototype.hasOwnProperty.call(store, key)) return false

  const { [key]: _removed, ...rest } = store
  await writeStore(rest)

  return true
}
