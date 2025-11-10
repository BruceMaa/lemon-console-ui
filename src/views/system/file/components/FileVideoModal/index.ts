import type { FileResp } from '@/apis'
import { Modal } from '@arco-design/web-vue'
import { h } from 'vue'
import ModalContent from './ModalContent.vue'

export function previewFileVideoModal(data: FileResp) {
  return Modal.open({
    title: '视频播放',
    width: 'auto',
    modalStyle: {},
    content: () => h(ModalContent, { data }),
  })
}
