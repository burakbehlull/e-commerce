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
    },
  },
})