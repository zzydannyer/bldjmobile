<script setup lang="ts">
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@store/user'
import UserService from '@/api/user'

/**
 * request测试
 *
 */
async function getData() {
  const params = {
    position: 1,
  }
  const res = await UserService.getList(params)
  const { code, data } = res.data
  if (code === 0) {
    console.log(data) // 这里访问data会有类型提示
  }
}

/**
 * pinia测试
 */
const userStore = useUserStore()
const { user, counter } = storeToRefs(userStore)
const userInfo = computed(() => userStore.getUserInfo)
const handleClick = () => {
  userStore.login()
  userStore.changeVal()
  // userStore.$patch(state => {
  // 	state.counter += 1
  // })
}
const handleReset = () => {
  userStore.$reset()
}

/**
 * uniapp内置icon测试
 */
const iconType: Ref<string[]> = ref([])

onBeforeMount(() => {
  iconType.value = [
    'success',
    'success_no_circle',
    'info',
    'warn',
    'waiting',
    'cancel',
    'download',
    'search',
    'clear',
  ]
})

/**
 * uniapp内置form测试
 */
const formSubmit = (e: any) => {
  console.log(
    'form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value),
  )
  let formdata = e.detail.value
  uni.showModal({
    content: '表单数据内容：' + JSON.stringify(formdata),
    showCancel: false,
  })
}
const formReset = (e: any) => {
  console.log('清空数据')
}
/**
 * 扩展组件uni-ui测试
 */
const popup = ref()
const popOpen = () => {
  popup.value.open('center')
}
const popClose = () => {
  popup.value.close()
}

/**
 * uni.showToast方法
 */
const showToast = () => {
  uni.showToast({
    title: 'showToast',
    icon: 'success',
    duration: 850,
  })
}

const showModal = () => {
  uni.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

/**
 * uview不可用
 * tailwind不可用
 */
</script>

<template>
  <!-- pinia测试 -->
  <view>{{ user }}</view>
  <view>{{ counter }}</view>
  <view>{{ userInfo }}</view>
  <button @click="handleClick">点击+1</button>
  <button @click="handleReset">重置</button>

  <!-- uniapp内置icon测试 -->
  <view class="item" v-for="(value, index) in iconType" :key="index">
    <icon :type="value" size="26" />
    <text>{{ value }}</text>
  </view>

  <!-- uniapp内置form测试begin -->
  <form @submit="formSubmit" @reset="formReset">
    <view class="uni-form-item uni-column">
      <view class="title">switch</view>
      <view>
        <switch name="switch" />
      </view>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">radio</view>
      <radio-group name="radio">
        <label>
          <radio value="radio1" />
          <text>选项一</text>
        </label>
        <label>
          <radio value="radio2" />
          <text>选项二</text>
        </label>
      </radio-group>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">checkbox</view>
      <checkbox-group name="checkbox">
        <label>
          <checkbox value="checkbox1" />
          <text>选项一</text>
        </label>
        <label>
          <checkbox value="checkbox2" />
          <text>选项二</text>
        </label>
      </checkbox-group>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">slider</view>
      <slider value="50" name="slider" show-value></slider>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">input</view>
      <input class="uni-input" name="input" placeholder="这是一个输入框" />
    </view>
    <view class="uni-btn-v">
      <button form-type="submit">Submit</button>
      <button form-type="reset">Reset</button>
    </view>
  </form>
  <!-- uniapp内置form测试end -->

  <!-- 扩展组件uni-ui测试 -->
  <uni-card>
    <text
      >这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text
    >
  </uni-card>
  <button @click="popOpen">打开弹窗</button>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-message type="success" message="成功消息" :duration="2000">
      <text>这是个Popup</text>
    </uni-popup-message>
    <button @click="popClose">关闭</button>
  </uni-popup>

  <!-- uni.showToast方法 -->
  <button @click="showToast">showToast</button>

  <!-- uni.showModal方法 -->
  <button @click="showModal">showModal</button>
</template>
