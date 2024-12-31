import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/app/shared/utils'),
      '@enums': path.resolve(__dirname, 'src/app/shared/enums'),
      '@models': path.resolve(__dirname, 'src/app/shared/models'),
      '@services': path.resolve(__dirname, 'src/app/shared/services'),
      '@views': path.resolve(__dirname, 'src/app/views'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },
});