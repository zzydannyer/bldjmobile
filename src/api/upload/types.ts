// 文件上传成功返回数据
export interface UploadRes {
  code: number
  msg: string
  data: {
    filename: string
    fileUrl: string
  }
}
