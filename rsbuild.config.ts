import { defineConfig } from '@rsbuild/core';

export const baseRSBuildConfig = defineConfig({
  html: {
    template: './index.html',
  },
  output: {
    distPath: {
      root: 'dist',
    },
  },
  tools: {
    postcss: (config) => {
      config.plugins = require('./postcss.config.ts').plugins;
    }
  }
});