import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return AutoImport({
    // 自动导入 vue 相关函数
    imports: [
      'vue',
      'vue-router',
      {
        // vue 3.5.x
        vue: ['useTemplateRef', 'onWatcherCleanup', 'useId'],
      },
    ],
    dts: './src/types/auto-imports.d.ts',
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  })
}
