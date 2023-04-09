// vite.config.js
import { defineConfig } from "file:///D:/Henry/Curso%20de%20Desarrollo%20Fullstack/02%20-%20Labs/03%20-%20PF/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Henry/Curso%20de%20Desarrollo%20Fullstack/02%20-%20Labs/03%20-%20PF/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dns from "dns";
import dotenv from "file:///D:/Henry/Curso%20de%20Desarrollo%20Fullstack/02%20-%20Labs/03%20-%20PF/client/node_modules/dotenv/lib/main.js";
import envPlugin from "file:///D:/Henry/Curso%20de%20Desarrollo%20Fullstack/02%20-%20Labs/03%20-%20PF/client/node_modules/vite-plugin-env/dist/vite-plugin-env.es2019.cjs";
dns.setDefaultResultOrder("verbatim");
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react(), envPlugin],
  server: {
    host: "localhost",
    port: 3001
  },
  ssr: {
    external: ["process"]
  },
  // optimizeDeps: {
  //   include: ["buffer", "process"],
  // },
  rollupInputOptions: {
    // Agrega la variable process al objeto globalThis
    onwarn(warning, rollupWarn) {
      if (warning.code === "THIS_IS_UNDEFINED" && warning.message.includes("process")) {
        return;
      }
      rollupWarn(warning);
    },
    output: {
      globals: {
        process: "globalThis.process"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIZW5yeVxcXFxDdXJzbyBkZSBEZXNhcnJvbGxvIEZ1bGxzdGFja1xcXFwwMiAtIExhYnNcXFxcMDMgLSBQRlxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEhlbnJ5XFxcXEN1cnNvIGRlIERlc2Fycm9sbG8gRnVsbHN0YWNrXFxcXDAyIC0gTGFic1xcXFwwMyAtIFBGXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovSGVucnkvQ3Vyc28lMjBkZSUyMERlc2Fycm9sbG8lMjBGdWxsc3RhY2svMDIlMjAtJTIwTGFicy8wMyUyMC0lMjBQRi9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBkbnMgZnJvbSBcImRuc1wiO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gXCJkb3RlbnZcIjtcclxuaW1wb3J0IGVudlBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZW52XCI7XHJcblxyXG5kbnMuc2V0RGVmYXVsdFJlc3VsdE9yZGVyKFwidmVyYmF0aW1cIik7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBlbnZQbHVnaW5dLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCJsb2NhbGhvc3RcIixcclxuICAgIHBvcnQ6IDMwMDEsXHJcbiAgfSxcclxuICBzc3I6IHtcclxuICAgIGV4dGVybmFsOiBbXCJwcm9jZXNzXCJdLFxyXG4gIH0sXHJcbiAgLy8gb3B0aW1pemVEZXBzOiB7XHJcbiAgLy8gICBpbmNsdWRlOiBbXCJidWZmZXJcIiwgXCJwcm9jZXNzXCJdLFxyXG4gIC8vIH0sXHJcbiAgcm9sbHVwSW5wdXRPcHRpb25zOiB7XHJcbiAgICAvLyBBZ3JlZ2EgbGEgdmFyaWFibGUgcHJvY2VzcyBhbCBvYmpldG8gZ2xvYmFsVGhpc1xyXG4gICAgb253YXJuKHdhcm5pbmcsIHJvbGx1cFdhcm4pIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHdhcm5pbmcuY29kZSA9PT0gXCJUSElTX0lTX1VOREVGSU5FRFwiICYmXHJcbiAgICAgICAgd2FybmluZy5tZXNzYWdlLmluY2x1ZGVzKFwicHJvY2Vzc1wiKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcm9sbHVwV2Fybih3YXJuaW5nKTtcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgIHByb2Nlc3M6IFwiZ2xvYmFsVGhpcy5wcm9jZXNzXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlZLFNBQVMsb0JBQW9CO0FBQ3RhLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTtBQUV0QixJQUFJLHNCQUFzQixVQUFVO0FBRXBDLE9BQU8sT0FBTztBQUdkLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUztBQUFBLEVBQzVCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxVQUFVLENBQUMsU0FBUztBQUFBLEVBQ3RCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJQSxvQkFBb0I7QUFBQTtBQUFBLElBRWxCLE9BQU8sU0FBUyxZQUFZO0FBQzFCLFVBQ0UsUUFBUSxTQUFTLHVCQUNqQixRQUFRLFFBQVEsU0FBUyxTQUFTLEdBQ2xDO0FBQ0E7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsT0FBTztBQUFBLElBQ3BCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
