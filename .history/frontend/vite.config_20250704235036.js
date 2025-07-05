import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy Socket.IO requests
      "/socket.io": {
        target: "http://localhost:1000", // Your Socket.IO server URL
        ws: true, // Enable WebSocket proxying (required for Socket.IO)
        changeOrigin: true, // Needed for virtual hosted sites
      },
    },
  },
});
