import type { ModalConfig, ModalReturn } from '@arco-design/web-vue'
import { Modal } from '@arco-design/web-vue'

let modalInstance: ModalReturn | null

const modalErrorWrapper = (options: ModalConfig) => {
  if (modalInstance) {
    modalInstance.close()
  }
  modalInstance = Modal.error(options)
}

export default modalErrorWrapper
