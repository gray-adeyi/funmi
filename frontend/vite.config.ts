import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import svg from '@poppanator/sveltekit-svg'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), svg()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@backend': path.resolve(__dirname, './wailsjs/go/main/App.js'),
      '@runtime': path.resolve(__dirname, './wailsjs/runtime/runtime.js')
    }
  }
})
