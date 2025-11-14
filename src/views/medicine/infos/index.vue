<template>
  <GiPageLayout>
    <GiTable
      row-key="id"
      :data="dataList"
      :columns="columns"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="pagination"
      :disabled-tools="['size']"
      :disabled-column-keys="['title']"
      @refresh="search"
    >
      <template #toolbar-left>
        <a-input-search v-model="queryForm.info" placeholder="搜索药品唯一标识、通用名称、英文名称和中文拼音" :style="{ width: '360px' }" allow-clear @search="search" />
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <template #default>重置</template>
        </a-button>
      </template>
      <template #toolbar-right>
        <a-button v-permission="['medicine:infos:create']" type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <template #default>新增</template>
        </a-button>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-link v-permission="['medicine:infos:get']" title="详情" @click="onDetail(record)">详情</a-link>
          <a-link v-permission="['medicine:infos:update']" title="修改" @click="onUpdate(record)">修改</a-link>
          <a-link v-permission="['medicine:infos:delete']" status="danger" title="删除" @click="onDelete(record)">删除</a-link>
        </a-space>
      </template>
    </GiTable>

    <MedicineAddModal ref="medicineAddModalRef" @save-success="search" />
    <MedicineDetailDrawer ref="medicineDetailDrawerRef" />
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import type { MedicineInfoQuery, MedicineInfoResp } from '@/apis'
import { deleteMedicineInfo, pageMedicineInfo } from '@/apis'
import { useTable } from '@/hooks'
import { isMobile } from '@/utils'
import has from '@/utils/has'
import MedicineAddModal from './MedicineAddModal.vue'
import MedicineDetailDrawer from './MedicineDetailDrawer.vue'

defineOptions({ name: 'MedicineInfos' })

const queryForm = reactive<MedicineInfoQuery>({
  sort: ['createdAt,desc'],
})

const {
  tableData: dataList,
  loading,
  pagination,
  search,
  handleDelete,
} = useTable((page) => pageMedicineInfo({ ...queryForm, ...page }), { immediate: true })

const columns: TableInstance['columns'] = [
  {
    title: '序号',
    width: 66,
    align: 'center',
    render: ({ rowIndex }) => h('span', {}, rowIndex + 1 + (pagination.current - 1) * pagination.pageSize),
  },
  { title: '药品唯一标识符', dataIndex: 'code', slotName: 'code', maxWidth: 180, ellipsis: true, tooltip: true },
  { title: '药品通用名称', dataIndex: 'genericName', maxWidth: 120, ellipsis: true, tooltip: true },
  { title: '药品英文名称', dataIndex: 'englishName', slotName: 'englishName', width: 120, align: 'center' },
  { title: '中文拼音', dataIndex: 'pinyin', slotName: 'pinyin', maxWidth: 165, ellipsis: true, tooltip: true },
  { title: '药品性状', dataIndex: 'appearance', slotName: 'appearance', maxWidth: 100, align: 'center' },
  { title: '剂型', dataIndex: 'dosageForm', slotName: 'dosageForm', maxWidth: 100, align: 'center' },
  { title: '规格', dataIndex: 'spec', slotName: 'spec', width: 110, align: 'center' },
  { title: '规格单位', dataIndex: 'specUnit', slotName: 'specUnit', width: 180 },
  { title: '包装规格', dataIndex: 'packageSpec', slotName: 'packageSpec', maxWidth: 100, align: 'center' },
  { title: '存储条件', dataIndex: 'storageConditions', slotName: 'storageConditions', maxWidth: 100, align: 'center' },
  { title: '有效期', dataIndex: 'validityPeriod', slotName: 'validityPeriod', maxWidth: 100, align: 'center' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    width: 160,
    align: 'center',
    fixed: !isMobile() ? 'right' : undefined,
    show: has.hasPermOr(['medicine:infos:get', 'medicine:infos:update', 'medicine:infos:delete']),
  },
]

// 重置
const reset = () => {
  queryForm.info = undefined
  search()
}

const medicineAddModalRef = ref<InstanceType<typeof MedicineAddModal>>()

// 新增
const onAdd = () => {
  medicineAddModalRef.value?.onAdd()
}

const medicineDetailDrawerRef = ref<InstanceType<typeof MedicineDetailDrawer>>()

// 详情
const onDetail = (record: MedicineInfoResp) => {
  medicineDetailDrawerRef.value?.onOpen(record.id)
}

// 修改
const onUpdate = (record: MedicineInfoResp) => {
  medicineAddModalRef.value?.onUpdate(record.id)
}

// 删除
const onDelete = (record: MedicineInfoResp) => {
  return handleDelete(() => deleteMedicineInfo(record.id), {
    content: `是否确定删除药品信息「${record.genericName}」？`,
    showModal: true,
  })
}
</script>

<style lang="scss" scoped></style>
