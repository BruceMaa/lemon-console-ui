<template>
  <VCharts ref="chart" :option="option" :autoresize="autoResize" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { registerMap } from 'echarts/core'
import VCharts from 'vue-echarts'
import chinaMap from './china.json'
import worldMap from './world.json'

defineProps({
  option: {
    type: Object,
    default() {
      return {}
    },
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
})

registerMap('world', worldMap as any)
registerMap('china', chinaMap as any)

const chart = ref(null)
defineExpose({
  chart,
})
</script>

<style scoped lang="less"></style>
