import type { NotificationConfig, NotificationReturn } from '@arco-design/web-vue'
import { Notification } from '@arco-design/web-vue'

let notificationInstance: NotificationReturn | null

const notificationErrorWrapper = (options: string | NotificationConfig) => {
  if (notificationInstance) {
    notificationInstance.close()
  }
  notificationInstance = Notification.error(options)
}

export default notificationErrorWrapper
