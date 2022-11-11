import { createUpload, createDownload } from '@prequest/miniprogram-addon'
import { UploadRes } from './types'

class UploadService {
  // 上传文件
  static uploadFile(filePath: string) {
    const upload = createUpload(uni.uploadFile, {
      name: 'imgFile',
      filePath,
      formData: { fileName: 'testName' },
    })
    return upload<UploadRes>('/fileUpload/imgUpload')
  }
  // 下载文件
  static downloadFile(url: string) {
    const download = createDownload(uni.downloadFile, {
      url,
    })
    return download(url)
  }
}

export default UploadService
