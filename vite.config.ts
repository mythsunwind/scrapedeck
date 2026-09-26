import { defineConfig, type UserConfig } from "vite";

export default defineConfig(() => {
    return {
        server: {
            proxy: {
                "/api":  {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                    secure: false
                }
            }
        },
    } as UserConfig
});