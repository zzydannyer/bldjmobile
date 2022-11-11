<template>
  <div>首页</div>
</template>

<script lang="ts" setup>
import UploadService from '@/api/upload'
// 选择照片或视频
const chooseMedia = (mediaType: 'image' | 'video' = 'image'): void => {
  uni.chooseMedia({
    count: 1,
    mediaType: [mediaType],
    sizeType: ['compressed'],
    maxDuration: 60,
    success(res) {
      const path = res.tempFiles.map((item) => item.tempFilePath)
      uploadFile(path[0])
    },
    fail() {
      // $toast("选取图片失败");
    },
  })
}

const uploadFile = async (path: string): Promise<void> => {
  const res = await UploadService.uploadFile(path)
  const { code, data } = res.data
  if (code === 0) {
    // 上传成功
  }
}
</script>

<style lang="scss" scoped></style>
