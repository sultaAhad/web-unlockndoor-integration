import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	publicDir: "src/assets",
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	server: {
		proxy: {
			// Proxy for API calls
			"/api": {
				target: "https://unlock-n-door-api-web.developer-ourbase-camp.com",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
			// Proxy for uploads/images
			"/uploads": {
				target: "https://unlock-n-door-api-web.developer-ourbase-camp.com",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		rollupOptions: {
			external: [],
		},
	},
});
