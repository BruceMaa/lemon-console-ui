/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ViteTypeOptions {
  // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
  // 这样就不允许有未知的键值了。
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_WS_URL: string
  readonly VITE_BASE: string
  readonly VITE_APP_SETTING: string
  readonly VITE_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
