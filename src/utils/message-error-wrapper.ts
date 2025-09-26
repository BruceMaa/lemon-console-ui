import type { MessageConfig, MessageReturn } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'

let messageInstance: MessageReturn | null

const messageErrorWrapper = (options: string | MessageConfig) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message.error(options)
}

export default messageErrorWrapper
