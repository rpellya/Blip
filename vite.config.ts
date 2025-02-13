import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import { transform } from 'esbuild';
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [tsconfigPaths(), {
    name: 'handlebars',
    transform(code, id) {
      if (id.endsWith('.hbs')) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: null
        };
      }
    }
  }],
  build: {
    outDir: "dist",
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: `@use "app/styles/variables/global" as *;`
  //     }
  //   }
  // },

  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     '~styles': path.resolve(__dirname, 'src/app/styles')
  //   }
  // }
});
