import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:1000",
        ws: true,
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:1000",
        changeOrigin: true,
      },
    },
  },
});
