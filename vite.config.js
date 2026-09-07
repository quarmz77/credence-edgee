import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // Keep cookie domain from the backend origin so auth cookies are valid
        // when accessing the frontend through an ngrok URL.
        cookieDomainRewrite: false,
      },
    },
  },
});
