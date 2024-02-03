import { rmSync } from 'fs'
import { BuildOptions, defineConfig } from 'vite'
import electron from 'vite-plugin-electron'


rmSync('dist/electron', { force: true, recursive: true }) // v14.14.0
// https://vitejs.dev/config
export default defineConfig(({ command }) => {
  rmSync('dist', { force: true, recursive: true })

  return {
    optimizeDeps: {
      include: ['klinecharts'],
    },
    plugins: [
      electron([
        {
          entry: 'electron//main.ts',
          vite: {
            build: { outDir: 'dist/electron/main' },
          },
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App')
            } else {
              options.startup()
            }
          },
        },
      ]),
    ],
  }
})
