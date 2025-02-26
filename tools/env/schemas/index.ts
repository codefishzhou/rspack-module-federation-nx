import { z } from 'zod';

// 全局环境变量规范
export const GlobalEnvSchema = z.object({
  // 基础配置
  NODE_ENV: z.enum(['development', 'test', 'production'])
    .default('development'),
  PUBLIC_APP_NAME: z.string(),
  
  // 功能开关
  // FEATURE_NEW_DASHBOARD: z.coerce.boolean().default(false),
  
  // API 配置
  API_BASE_URL: z.string().url(),
  
  // 实验性配置
  // EXPERIMENTAL_SSR: z.coerce.boolean().optional()
});

// 项目特定扩展
export const HostEnvSchema = GlobalEnvSchema.extend({
  HOST_PORT: z.coerce.number().min(3000).max(9999),
  // ANALYZE_BUNDLE: z.coerce.boolean().default(false)
});