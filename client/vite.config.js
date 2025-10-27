import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tsconfigPaths from "vite-tsconfig-paths"
import * as path from "node:path"

function way(name){
  return path.resolve(__dirname, name)
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8000,
  },
  resolve: {
    alias: {
      '~': way('src'),
      '@api': way('src/base/api.js'),
      '@requests': way('src/base/requests.js'),
      '@pages': way('src/pages/index'),
      '@ui': way('src/components/ui/index'),
      '@components': way('src/components/index'),
      '@partials': way('src/components/partials/index'),
      '@modals': way('src/components/modals/index'),
	  '@helpers': way('src/helpers/index'),
	  '@schemas': way('src/schemas/index'),
	  '@store': way('src/store/index'),
    }
  },
})