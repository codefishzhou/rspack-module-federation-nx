import { HostEnvSchema } from '../schemas/index';
import { expand } from 'dotenv-expand';
import { config } from 'dotenv';
import path from 'path';

export function loadNxEnv(projectRoot: string) {
  // 加载顺序：全局 → 项目 → 环境 → 本地
  const envFiles = [
    path.join(__dirname, '../../../.env'),
    path.join(projectRoot, '.env'),
    path.join(projectRoot, `.env.${process.env.NODE_ENV}`),
    path.join(projectRoot, '.env.local')
  ];

  envFiles.forEach(file => {
    if (require('fs').existsSync(file)) {
      expand(config({ path: file }));
    }
  });

  // 验证环境变量
  return HostEnvSchema.safeParse(process.env);
}