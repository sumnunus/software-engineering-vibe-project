import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const busApiKey = env.SEOUL_BUS_API_KEY ?? "";

  return {
    server: {
      proxy: {
        "/api/seoul-bus": {
          target: "http://ws.bus.go.kr/api/rest/stationinfo",
          changeOrigin: true,
          rewrite(path) {
            const apiPath = path.replace(/^\/api\/seoul-bus/, "");
            const separator = apiPath.includes("?") ? "&" : "?";
            return `${apiPath}${separator}serviceKey=${busApiKey}`;
          },
        },
      },
    },
  };
});
