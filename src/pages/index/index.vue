<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import type { Ref } from 'vue'
import { useUserStore } from '@/store/modules/user';
import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue'

/**
 * pinia测试
 */
const userStore = useUserStore();
const user = computed(() => userStore.getUser);
const handleClick = () => {
	userStore.login();
	userStore.changeVal();
};

/**
 * uniapp内置icon测试
 */
const iconType: Ref<string[]> = ref([]);

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
		'clear'
	];
});

/**
 * uniapp内置form测试
 */
const formSubmit = (e: any) => {
	console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
	let formdata = e.detail.value
	uni.showModal({
		content: '表单数据内容：' + JSON.stringify(formdata),
		showCancel: false
	});
}
const formReset = (e: any) => {
	console.log('清空数据')
}

/**
 * uview不可用
 */
</script>

<template>
	<!-- pinia测试 -->
	<view>{{ user }}</view>
	<button @click="handleClick">点击</button>

	<!-- uniapp内置icon测试 -->
	<view class="item"
		  v-for="(value, index) in iconType"
		  :key="index">
		<icon :type="value"
			  size="26" />
		<text>{{ value }}</text>
	</view>

	<!-- uniapp内置form测试begin -->
	<form @submit="formSubmit"
		  @reset="formReset">
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
			<slider value="50"
					name="slider"
					show-value></slider>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">input</view>
			<input class="uni-input"
				   name="input"
				   placeholder="这是一个输入框" />
		</view>
		<view class="uni-btn-v">
			<button form-type="submit">Submit</button>
			<button form-type="reset">Reset</button>
		</view>
	</form>
	<!-- uniapp内置form测试end -->

	<!-- 扩展组件uni-ui测试 -->
	<uni-card>
		<text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
	</uni-card>
</template>

<style lang="scss" scoped>
* {
	padding: 5px;
}
</style>
