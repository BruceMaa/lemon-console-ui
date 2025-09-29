import type { Plugin } from 'vite'
import boxen from 'boxen'
import picocolors from 'picocolors'
import { description, version } from '../../package.json'

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, bgGreen } = picocolors
      console.log(
        boxen(`${bold(green(`${bgGreen(`${description} v${version}`)}`))}\n`, {
          padding: 1,
          margin: 1,
          borderStyle: 'double',
          textAlignment: 'center',
        }),
      )
    },
  }
}
