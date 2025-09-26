import boxen from 'boxen'
import picocolors from 'picocolors'
import type { Plugin } from 'vite'

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, bgGreen } = picocolors
      console.log(
        boxen(`${bold(green(`${bgGreen('柠檬控制系统 v1.0.0')}`))}\n`, {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          textAlignment: 'center',
        }),
      )
    },
  }
}
