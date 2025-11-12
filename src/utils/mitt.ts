import mitt from 'mitt'

interface Events {
  // 自定义事件名称
  event: void
  // 任意传递的参数
  [key: string]: any
  [key: symbol]: any
}

const mittBus = mitt<Events>()
export default mittBus
