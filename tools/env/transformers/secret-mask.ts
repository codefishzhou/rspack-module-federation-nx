//敏感信息处理
// import { replace } from '@rollup/plugin-replace';

// export function createSecretMask() {
//   const secrets = new Set(['API_KEY', 'DB_PASSWORD']);
  
//   return replace({
//     preventAssignment: true,
//     values: Object.fromEntries(
//       Object.entries(process.env)
//         .filter(([key]) => secrets.has(key))
//         .map(([key, val]) => [key, JSON.stringify(`[MASKED_${key}]`)])
//     )
//   });
// }