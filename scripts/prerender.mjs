// Injects the server-rendered app into dist/index.html after `vite build`.
// The client still mounts with createRoot, so this only affects what
// crawlers and link previews see before JavaScript runs.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const htmlPath = path.join(root, 'dist', 'index.html')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(pathToFileURL(ssrEntry).href)
const appHtml = render()
const html = await readFile(htmlPath, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html')
await writeFile(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${appHtml.length} chars into dist/index.html`)
