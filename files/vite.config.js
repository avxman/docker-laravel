import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

const server = ()=>{
    const env = process.env.APP_ENV??'production'
    const port = env === "local" ? 3000 : 8000
    const origin = env === "local" ? 'http://localhost:3000' : 'http://localhost:8000'
    const host = env === "local" ? 'localhost' : 'localhost'
    const watch = env === "local" ? {usePolling: true} : {}
    return {
        host : true,
        hmr: { host },
        port,
        origin,
        watch
    }
}

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts', 'resources/styles/scss/app.scss'],
            refresh: [{
                paths: ['resources/js/**', 'resources/styles/scss/**'],
                config: { delay: 50 }
            }],
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: server(),
});
