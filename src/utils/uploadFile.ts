import { getCosAuth } from '@/api'
import COS from 'cos-wx-sdk-v5'
import moment from 'dayjs'
import { hideLoading, msg, showLoading, uuid } from './tools'
import { deepClone, waitTime } from './common'
import { IUploadDir } from '@/declare'

export async function uploadFile(
  tempFilesOri: string[],
  uploadDir: string = IUploadDir.upload
): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    const tempFiles = deepClone(tempFilesOri)
    const dirName = moment().format('YYYY-MM-DD')

    const { data } = await getCosAuth()

    const cos = new COS({
      async getAuthorization(options, callback) {
        callback({
          TmpSecretId: data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials.tmpSecretKey,
          XCosSecurityToken: data.credentials.token,
          ExpiredTime: data.expiredTime,
        })
      },
    })
    const paths: string[] = []
    for (let i = 0; i < tempFiles.length; i++) {
      showLoading()
      const item = tempFiles[i]
      let fileNameArr = item.split('.') || []
      let postfix = fileNameArr[fileNameArr.length - 1]
      const id = uuid()
      let fileName = `${id}.${postfix}`

      await cos.postObject(
        {
          Bucket: 'loveme-1319273684' /* 必须 */,
          // Bucket: 'loveme-1319273684.cos.accelerate.myqcloud.com',
          Region: 'ap-hongkong' /* 存储桶所在地域，必须字段 */,
          Key: `${uploadDir}/${dirName}/${fileName}` /* 必须 */,
          FilePath: item /* 必须 */,
          onProgress: function (progressData: any) {
            /* 非必须 */
            // console.log(JSON.stringify(progressData))
          },
        },
        async function (err: any, data: any) {
          if (err && err.statusCode === 403) {
            setTimeout(() => {
              uni.showToast({
                title: '系统错误,请检查系统当前时间是否正确，或是否授权',
                mask: true,
                icon: 'none',
                duration: 1000,
              })
            }, 10)
            hideLoading()
            return
          }

          if (err) {
            hideLoading()
            waitTime(100)
            msg('上传失败，请重试')
            console.log(err)

            return reject()
          }

          if (!err) {
            paths.push('https://' + data.Location)
          }

          if (paths.length === tempFiles.length) {
            hideLoading()
            console.log('paths', paths)

            return resolve(paths)
          }
          console.log(i, tempFiles, paths.length)

          if (i === tempFiles.length - 1 && paths.length !== tempFiles.length) {
            hideLoading()
            waitTime(100)
            console.log(paths)

            msg('上传失败，请重试')
            return reject()
          }
        }
      )
    }
  })
}
