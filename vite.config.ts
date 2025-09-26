import type { ConfigEnv, UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './config/plugins'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv
  const isProduction = mode === 'production'

  return {
    // 开发或生产环境服务的公共基础路径
    base: env.VITE_BASE,
    // 路径别名
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 引入sass全局样式变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`,
          api: 'modern-compiler',
        },
      },
    },
    // 添加需要vite优化的依赖
    optimizeDeps: {
      include: ['vue-draggable-plus'],
    },
    server: {
      // 服务启动时是否自动打开浏览器
      open: false,
      // 本地跨域代理 -> 代理到服务器的接口地址
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_API_BASE_URL, // 后台服务器地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 是否允许https
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_PREFIX}`), ''), // 重写请求路径
        },
      },
    },
    plugins: createVitePlugins(env, command === 'build'),
    // 构建
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的dist目录
      minify: 'esbuild', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions才能生效
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
    // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
    envPrefix: ['VITE', 'FILE'],
  }
})
