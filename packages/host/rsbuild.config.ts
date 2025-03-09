import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import path from "node:path";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
// import {loadNxEnv} from "@monorepo/tools";
import {loadNxEnv} from '../tools'

const env = loadNxEnv(__dirname);
if (!env.success) {
  throw new Error(`环境变量验证失败: ${JSON.stringify(env.error.format())}`);
}

const port = Number(env.data.HOST_PORT);
const validPort = Number.isInteger(port) && port > 0 ? port : 3000;

export default defineConfig({
  html: {
    title: "主应用",
    favicon: "./public/favicon.svg",
    meta: {
      charset: { charset: "utf-8" },
      viewport: "width=device-width, initial-scale=1.0",
    },
  },
  server: {
    port: validPort,
    proxy: {
      '/worknotes': {
        target: env.data.API_BASE_URL,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  source: {
    entry: { index: "./src/main.js" },
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    define: {
      'process.env': JSON.stringify({
        ...env.data,
        // 安全过滤敏感字段
        API_KEY: undefined,
        DB_PASSWORD: undefined,
        PUBLIC_APP_NAME: JSON.stringify(process.env.PUBLIC_APP_NAME)
      })
    }
  },
  plugins: [
    pluginVue(),
    pluginSass()
  ],
  tools: {
    rspack(config, { appendPlugins }) {
      appendPlugins([
        new ModuleFederationPlugin({
          name: "ASSET_HOST",
          filename: "ASSET_HOST__remoteEntry.js",
          // remotes: {
          //   "@remote": `ASSET_REMOTE@${env.data.VUE_APP_REMOTEECHARTS}/remoteEntry.js`,
          //   "@user": `USER_REMOTE@${env.data.VUE_APP_REMOTEECHARTS_USER}/remoteEntry.js`
          // },
        })
      ]);
    }
  }
});
