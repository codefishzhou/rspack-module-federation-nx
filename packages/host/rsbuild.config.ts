import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';
import { defineConfig } from '@rsbuild/core';
import { merge } from 'webpack-merge';
// import { mergeConfig } from '@rsbuild/core';
import { loadNxEnv } from '@monorepo/tools';

const env = loadNxEnv(__dirname);
if (!env.success) {
  const errorDetails = env.error.errors.map(e => 
    `${e.path.join('.')}: ${e.message}`
  ).join('\n  - ');
  
  throw new Error(`环境变量验证失败:\n  - ${errorDetails}\n请检查 .env 文件或环境变量设置`);
}

const baseConfig = require('../../rsbuild.config.ts');

const port = Number(env.data.HOST_PORT);
const validPort = Number.isInteger(port) && port > 0 ? port : 3000;

export default defineConfig(merge(baseConfig, {
  html: {
    template: './index.html',
  },
  plugins: [pluginVue(), pluginSass()],

  source: {
    entry: {
      index: './src/main.ts',
    },
    tsconfigPath: './tsconfig.app.json',
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
  server: {
    port: validPort,
  },
  output: {
    target: 'web',
    distPath: {
      root: 'dist',
    },
  },
  tools: {
    postcss: (config) => {
      // 强制使用根目录配置
      config.plugins = require('../../postcss.config.ts').plugins;
    }
  }
}));
