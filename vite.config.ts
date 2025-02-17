import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        tsconfigPaths(),
        {
            name: 'handlebars',
            transform(code, id) {
                if (id.endsWith('.hbs')) {
                    return {
                        code: `export default ${JSON.stringify(code)};`,
                        map: null,
                    };
                }
            },
        },
    ],
    build: {
        outDir: 'dist',
    },
});
