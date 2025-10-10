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
        const cssFiles = await fg(['_nuxt/**/*.css'], {
          cwd: publicDir,
          onlyFiles: true,
        })

        const appCss =
          cssFiles.find((f) => /\/app\.[\w-]+\.css$/.test(f)) ??
          cssFiles[0] ??
          null

        const manifest: CssManifest = { appCss: appCss ? `/${appCss}` : null }
        const manifestPath = join(publicDir, 'css-manifest.json')
        await fs.writeFile(manifestPath, JSON.stringify(manifest), 'utf8')
      })
    })
  },
})
