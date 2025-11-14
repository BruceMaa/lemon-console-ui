<template>
  <a-drawer v-model:visible="visible" title="药品信息详情" :width="width >= 720 ? 720 : '100%'" :footer="false">
    <a-descriptions title="基本信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="药品唯一标识符">{{ dataDetail?.code }}</a-descriptions-item>
      <a-descriptions-item label="药品通用名称">{{ dataDetail?.genericName }}</a-descriptions-item>
      <a-descriptions-item label="药品英文名称">{{ dataDetail?.englishName }}</a-descriptions-item>
      <a-descriptions-item label="中文拼音">{{ dataDetail?.pinyin }}</a-descriptions-item>
      <a-descriptions-item label="药品性状">{{ dataDetail?.appearance }}</a-descriptions-item>
      <a-descriptions-item label="剂型">{{ dataDetail?.dosageForm }}</a-descriptions-item>
      <a-descriptions-item label="规格">{{ dataDetail?.spec }}</a-descriptions-item>
      <a-descriptions-item label="规格单位">{{ dataDetail?.specUnit }}</a-descriptions-item>
      <a-descriptions-item label="包装规格">{{ dataDetail?.packageSpec }}</a-descriptions-item>
      <a-descriptions-item label="存储条件">{{ dataDetail?.storageConditions }}</a-descriptions-item>
      <a-descriptions-item label="有效期">{{ dataDetail?.validityPeriod }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="详细信息" :column="1" size="large" class="general-description">
      <a-descriptions-item label="活性成分列表"><GiCellTags :data="dataDetail?.activeIngredients" /></a-descriptions-item>
      <a-descriptions-item label="辅料 / 非活性成分列表"><GiCellTags :data="dataDetail?.excipients" /></a-descriptions-item>
      <a-descriptions-item label="给药途径"><GiCellTags :data="dataDetail?.routeOfAdministration" /></a-descriptions-item>
      <a-descriptions-item label="治疗类别"><GiCellTags :data="dataDetail?.therapeuticCategories" /></a-descriptions-item>
      <a-descriptions-item label="药理毒理">{{ dataDetail?.pharmacology }}</a-descriptions-item>
      <a-descriptions-item label="药代动力学">{{ dataDetail?.pharmacokinetics }}</a-descriptions-item>
      <a-descriptions-item label="适应症">{{ dataDetail?.indications }}</a-descriptions-item>
      <a-descriptions-item label="用法用量">{{ dataDetail?.dosage }}</a-descriptions-item>
      <a-descriptions-item label="禁忌症">{{ dataDetail?.contraindications }}</a-descriptions-item>
      <a-descriptions-item label="注意事项">{{ dataDetail?.precautions }}</a-descriptions-item>
      <a-descriptions-item label="不良反应">{{ dataDetail?.adverseReactions }}</a-descriptions-item>
      <a-descriptions-item label="药物相互作用">{{ dataDetail?.drugInteractions }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import type { MedicineInfoDetailResp } from '@/apis'
import { useWindowSize } from '@vueuse/core'
import { getMedicineInfo } from '@/apis'

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<MedicineInfoDetailResp>()
const visible = ref(false)

// 查询详情
const getDataDetail = async () => {
  const { data } = await getMedicineInfo(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style lang="scss" scoped></style>
