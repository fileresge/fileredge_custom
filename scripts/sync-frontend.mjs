import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const source = join(root, '..', 'frontend')
const publicDirectory = join(root, 'public')
const pageDirectory = join(publicDirectory, 'pages')

await mkdir(publicDirectory, { recursive: true })
await rm(join(publicDirectory, 'assets'), { recursive: true, force: true })
await rm(pageDirectory, { recursive: true, force: true })
await cp(join(source, 'assets'), join(publicDirectory, 'assets'), { recursive: true })
await mkdir(pageDirectory, { recursive: true })

const entries = await readdir(source, { withFileTypes: true })
const pages = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.html'))

await Promise.all(
  pages.map((page) => cp(join(source, page.name), join(pageDirectory, page.name))),
)

console.log(`Synced ${pages.length} pages and frontend assets.`)
