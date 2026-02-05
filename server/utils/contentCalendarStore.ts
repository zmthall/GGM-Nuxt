import { promises as fs } from 'node:fs'
import path from 'node:path'

export type ContentCalendarRecord = {
  key: string
  csv: string
  createdAt: string
  updatedAt: string
}

type StoreShape = Record<string, ContentCalendarRecord>

function getAppRootFromCwd() {
  const cwd = process.cwd()

  // If we're running from a Nitro build output, cwd will often include "/.output"
  // We want the directory *above* ".output" (your real project root).
  const marker = `${path.sep}.output`
  const idx = cwd.lastIndexOf(marker)

  if (idx === -1) return cwd

  // Keep everything before "/.output"
  return cwd.slice(0, idx)
}

const APP_ROOT = getAppRootFromCwd()
const FILE_PATH = path.join(APP_ROOT, 'server', 'data', 'content-calendars.json')

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
  return Object.values(store)
    .sort((a, b) => (a.key < b.key ? 1 : -1))
    .map(({ key, createdAt, updatedAt }) => ({ key, createdAt, updatedAt }))
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

  // eslint-safe: remove without `delete store[key]`
  const { [key]: _removed, ...rest } = store
  await writeStore(rest)

  return true
}