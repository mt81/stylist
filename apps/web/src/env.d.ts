/* eslint-disable */

declare module 'quasar/wrappers' {
  import type { UserConfig } from '@quasar/app-vite';
  export function configure(fn: () => UserConfig): () => UserConfig;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
