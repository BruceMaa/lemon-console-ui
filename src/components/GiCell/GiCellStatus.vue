<template>
  <span v-if="props.status === 1">
    <icon-check-circle-fill class="success" />
    <span>启用</span>
  </span>
  <span v-if="props.status === 0">
    <icon-minus-circle-fill class="warning" />
    <span>禁用</span>
  </span>
</template>

<script setup lang="ts">
import type { Status } from '@/enums'

defineOptions({ name: 'GiCellStatus' })

const props = withDefaults(defineProps<Props>(), {
  status: 1,
})

interface Props {
  status?: Status
}
</script>

<style scoped lang="scss"></style>
