// modules/css-manifest.ts
import { defineNuxtModule } from '@nuxt/kit'
import type { Nitro } from 'nitropack'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import fg from 'fast-glob'

type CssManifest = { appCss: string | null }

export default defineNuxtModule({
  meta: { name: 'css-manifest' },
  setup(_options, nuxt) {
    nuxt.hooks.hook('nitro:init', (nitro: Nitro) => {
      nitro.hooks.hook('compiled', async () => {
        const publicDir = nitro.options.output.publicDir // .output/public

        // search both locations Nuxt/Vite can place CSS
        const cssFiles = await fg(['assets/**/*.css', '_nuxt/**/*.css'], {
          cwd: publicDir,
          onlyFiles: true,
        })

        // prefer Vite’s style.<hash>.css, then app.<hash>.css, then first
        const pick = (re: RegExp) => cssFiles.find(f => re.test(f))
        const chosen =
          pick(/\/style\.[\w-]+\.css$/) ??
          pick(/\/app\.[\w-]+\.css$/) ??
          cssFiles[0] ??
          null

        const manifest: CssManifest = { appCss: chosen ? `/${chosen}` : null }
        const manifestPath = join(publicDir, 'css-manifest.json')
        await fs.writeFile(manifestPath, JSON.stringify(manifest), 'utf8')
      })
    })
  },
})
