import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import dotenv from "dotenv";
import envPlugin from "vite-plugin-env";

dns.setDefaultResultOrder("verbatim");

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envPlugin],
  server: {
    host: "localhost",
    port: 3001,
  },
});
