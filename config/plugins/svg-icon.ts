import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild: boolean) {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标路径
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定 synbolId 格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
