import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	// 👇 serve src/assets as public
	publicDir: "src/assets",
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"), // optional, for cleaner imports
		},
	},
});
