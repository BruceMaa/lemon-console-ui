<template>
  <a-modal
    v-model:visible="visible" :title="title" :mask-closable="false" :esc-to-close="false"
    :width="width >= 500 ? 500 : '100%'" draggable @before-ok="save" @ok="saveAfter" @close="reset"
  >
    <GiForm ref="formRef" v-model="form" :columns="columns">
    </GiForm>
  </a-modal>
</template>

<script setup lang="ts">
import type { ColumnItem } from '@/components/GiForm'
import { Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import NProgress from 'nprogress'
import { updateUserEmail, updateUserPassword, updateUserPhone } from '@/apis'
import { GiForm } from '@/components/GiForm'
import { useResetReactive } from '@/hooks'
import router from '@/routers'
import { useUserStore } from '@/stores'
import { encryptByRsa } from '@/utils/encrypt'
import modalErrorWrapper from '@/utils/modal-error-wrapper'
import * as Regexp from '@/utils/regexp'

const { width } = useWindowSize()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const verifyType = ref()
const title = computed(
  () => `修改${verifyType.value === 'phone' ? '手机号' : verifyType.value === 'email' ? '邮箱' : '密码'}`,
)
const formRef = ref<InstanceType<typeof GiForm>>()

const [form, resetForm] = useResetReactive({
  phone: '',
  email: '',
  captcha: '',
  oldPassword: '',
  newPassword: '',
  rePassword: '',
})

const columns: ColumnItem[] = reactive([
  {
    label: '手机号',
    field: 'phone',
    type: 'input',
    span: 24,
    props: {
      showWordLimit: false,
    },
    rules: [
      { required: true, message: '请输入手机号' },
      { match: Regexp.Phone, message: '请输入正确的手机号' },
    ],
    hide: () => {
      return verifyType.value !== 'phone'
    },
  },
  {
    label: '邮箱',
    field: 'email',
    type: 'input',
    span: 24,
    rules: [
      { required: true, message: '请输入邮箱' },
      { match: Regexp.Email, message: '请输入正确的邮箱' },
    ],
    hide: () => {
      return verifyType.value !== 'email'
    },
  },
  {
    label: '当前密码',
    field: 'oldPassword',
    type: 'input-password',
    span: 24,
    rules: [{ required: true, message: '请输入当前密码' }],
    hide: () => {
      return !userInfo.value.pwdResetTime
    },
  },
  {
    label: '新密码',
    field: 'newPassword',
    type: 'input-password',
    span: 24,
    rules: [
      { required: true, message: '请输入新密码' },
      {
        validator: (value, callback) => {
          if (value === form.oldPassword) {
            callback('新密码不能与当前密码相同')
          } else {
            callback()
          }
        },
      },
    ],
    hide: () => {
      return verifyType.value !== 'password'
    },
  },
  {
    label: '确认新密码',
    field: 'rePassword',
    type: 'input-password',
    span: 24,
    props: {
      placeholder: '请再次输入新密码',
    },
    rules: [
      { required: true, message: '请再次输入新密码' },
      {
        validator: (value, callback) => {
          if (value !== form.newPassword) {
            callback('两次输入的密码不一致')
          } else {
            callback()
          }
        },
      },
    ],
    hide: () => {
      return verifyType.value !== 'password'
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
  const isInvalid = await formRef.value?.formRef?.validate()
  if (isInvalid) return false
  try {
    if (verifyType.value === 'phone') {
      await updateUserPhone({
        phone: form.phone,
        captcha: form.captcha,
        oldPassword: encryptByRsa(form.oldPassword) as string,
      })
      Message.success('修改成功')
    } else if (verifyType.value === 'email') {
      await updateUserEmail({
        email: form.email,
        captcha: form.captcha,
        oldPassword: encryptByRsa(form.oldPassword) as string,
      })
      Message.success('修改成功')
    } else if (verifyType.value === 'password') {
      if (form.newPassword !== form.rePassword) {
        Message.error('两次新密码不一致')
        return false
      }
      if (form.newPassword === form.oldPassword) {
        Message.error('新密码与旧密码不能相同')
        return false
      }
      await updateUserPassword({
        oldPassword: encryptByRsa(form.oldPassword) || '',
        newPassword: encryptByRsa(form.newPassword) || '',
      })
    }
    return true
  } catch {
    return false
  }
}
const saveAfter = async () => {
  if (verifyType.value === 'password') {
    modalErrorWrapper({
      title: '提示',
      content: '密码修改成功! 请保存好新密码，并使用新密码重新登录',
      maskClosable: false,
      escToClose: false,
      okText: '重新登录',
      async onOk() {
        NProgress.done()
        const userStore = useUserStore()
        await userStore.logoutCallBack()
        await router.replace('/login')
      },
    })
  } else {
    // 修改成功后，重新获取用户信息
    await userStore.getUserInfo()
  }
}

const visible = ref(false)
// 打开弹框
const open = (type: string) => {
  verifyType.value = type
  visible.value = true
}

defineExpose({ open })
</script>

<style scoped lang="scss">
.captcha-btn {
  margin-left: 12px;
  min-width: 98px;
  border-radius: 4px;
}
</style>
