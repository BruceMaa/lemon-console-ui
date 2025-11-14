<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :mask-closable="false"
    :esc-to-close="false"
    :body-style="{ maxHeight: width >= 650 ? '76vh' : '100vh' }"
    :width="width >= 950 ? 950 : '100%'"
    draggable
    @before-ok="save"
    @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns">
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
import type { MedicineInfoReq } from '@/apis'
import type { ColumnItem } from '@/components/GiForm'
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import { createMedicineInfo, getMedicineInfo, updateMedicineInfo } from '@/apis'
import { useResetReactive } from '@/hooks'

const emit = defineEmits<{
  (e: 'save-success'): void
}>()

const { width } = useWindowSize()

const dataId = ref('')
const visible = ref(false)
const isUpdate = computed(() => !!dataId.value)
const title = computed(() => (isUpdate.value ? '修改药品信息' : '新增药品信息'))
const formRef = ref<InstanceType<typeof GiForm>>()

const [form, resetForm] = useResetReactive({
} as MedicineInfoReq)

const columns: ColumnItem[] = reactive([
  {
    type: 'group-title',
    label: '基本信息',
    field: 'base-title',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' },
    },
  },
  {
    label: '药品唯一标识符',
    field: 'code',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 50,
    },
  },
  {
    label: '药品通用名称',
    field: 'genericName',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '药品英文名称',
    field: 'englishName',
    type: 'input',
    span: 12,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '中文拼音',
    field: 'pinyin',
    type: 'input',
    span: 12,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '药品性状',
    field: 'appearance',
    type: 'input',
    span: 12,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '剂型',
    field: 'dosageForm',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '规格',
    field: 'spec',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '规格单位',
    field: 'specUnit',
    type: 'input',
    span: 12,
    required: true,
    props: {
      maxLength: 50,
    },
  },
  {
    label: '包装规格',
    field: 'packageSpec',
    type: 'input',
    span: 8,
    props: {
      maxLength: 50,
    },
  },
  {
    label: '存储条件',
    field: 'storageConditions',
    type: 'input',
    span: 8,
    required: true,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '有效期',
    field: 'validityPeriod',
    type: 'input',
    span: 8,
    required: true,
    props: {
      maxLength: 50,
    },
  },
  {
    type: 'group-title',
    label: '详细信息',
    field: 'detail-title',
    span: 24,
    formItemProps: {
      labelColStyle: { display: 'none' },
    },
  },
  {
    label: '活性成分列表',
    field: 'activeIngredients',
    type: 'input-tag',
    span: 24,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '辅料 / 非活性成分列表',
    field: 'excipients',
    type: 'input-tag',
    span: 24,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '给药途径',
    field: 'routeOfAdministration',
    type: 'input-tag',
    span: 24,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '治疗类别',
    field: 'therapeuticCategories',
    type: 'input-tag',
    span: 24,
    props: {
      maxLength: 100,
    },
  },
  {
    label: '药理毒理',
    field: 'pharmacology',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '药代动力学',
    field: 'pharmacokinetics',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '适应症',
    field: 'indications',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '用法用量',
    field: 'dosage',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '禁忌症',
    field: 'contraindications',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '注意事项',
    field: 'precautions',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '不良反应',
    field: 'adverseReactions',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
  {
    label: '药物相互作用',
    field: 'drugInteractions',
    type: 'textarea',
    span: 24,
    props: {
      maxLength: 500,
    },
  },
])

// 重置
const reset = () => {
  formRef.value?.formRef?.resetFields()
  resetForm()
}

// 保存
const save = async () => {
  try {
    const isInvalid = await formRef.value?.formRef?.validate()
    if (isInvalid) return false
    if (isUpdate.value) {
      await updateMedicineInfo({ ...form }, dataId.value)
      Message.success('修改成功')
    } else {
      await createMedicineInfo({ ...form })
      Message.success('新增成功')
    }
    emit('save-success')
    return true
  } catch {
    return false
  }
}

const onAdd = () => {
  reset()
  visible.value = true
}

const onUpdate = async (id: string) => {
  reset()
  dataId.value = id
  const { data } = await getMedicineInfo(id)
  Object.assign(form, data)
  visible.value = true
}

defineExpose({ onAdd, onUpdate })
</script>

<style lang="scss" scoped></style>
