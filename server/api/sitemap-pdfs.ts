import { readdir } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

async function getPdfFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, {
    withFileTypes: true
  })

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        return getPdfFiles(fullPath)
      }

      if (
        entry.isFile() &&
        entry.name.toLowerCase().endsWith('.pdf')
      ) {
        return [fullPath]
      }

      return []
    })
  )

  return files.flat()
}

export default defineEventHandler(async () => {
  const pdfRoot = join(
    process.cwd(),
    'public',
    'pdfs',
    'indexed'
  )

  const files = await getPdfFiles(pdfRoot)

  return files.map((file) => {
    const relativePath = relative(pdfRoot, file)
      .split(sep)
      .join('/')

    return {
      loc: `/pdfs/indexed/${relativePath}`
    }
  })
})