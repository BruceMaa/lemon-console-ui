<template>
  <div class="gi_page container">
    <a-space direction="vertical" :size="14" fill>
      <div>
        <DataOverview />
      </div>
      <div>
        <a-grid :cols="24" :col-gap="14" :row-gap="14">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18, xxl: 18 }">
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
          </a-grid-item>
        </a-grid>
      </div>
      <div>
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18, xxl: 18 }">
          </a-grid-item>
          <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6, xxl: 6 }">
          </a-grid-item>
        </a-grid>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import DataOverview from './components/DataOverview/index.vue'

defineOptions({ name: 'Analysis' })
</script>

<style scoped lang="scss"></style>
