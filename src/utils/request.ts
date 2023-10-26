import { IStoreTypes } from '@/declare'
import config from '../config' // 配置文件
import { msg } from './tools'

let reqOptions: CustomRequestOptions | null = null
const request = async (options: CustomRequestOptions) => {
  reqOptions = JSON.parse(JSON.stringify(options))
  const { url, method, baseUrl = config.uni_app_web_api_url } = options

  if (options.loading) {
    // uni.showLoading('')
  }

  options.url = baseUrl + '' + url

  options.header = {}

  const commonHeader = {
    Authorization: uni.getStorageSync(IStoreTypes.token)
      ? 'Bearer ' + uni.getStorageSync(IStoreTypes.token)
      : '',
  }

  Object.assign(options.header, commonHeader)

  console.log(options.url, '入參：', options.data)
  console.log('请求header', options.header)
  return new Promise<ResponseOptions['data']>((resolve, reject) => {
    const defaultOptions = {
      success: async (result: UniApp.RequestSuccessCallbackResult) => {
        console.log(options.url, '返回：', result)
        if (+result.statusCode === 401) {
          reject(result)
          return uni.reLaunch({
            url: '/pages/Login/index',
          })
        }

        if (+result.statusCode !== 200) {
          reject(result)
          return msg('请求异常')
        }

        const res = result.data as AnyObject
        try {
          const resData = await resolveErrorRes(res)
          if (res && res.code) {
            resolve(resData as ResponseOptions['data'])
          }
        } catch (e) {
          //TODO handle the exception
          console.log(e)
          reject(requestErrorResponse())
        }
      },
      fail: (err: GeneralCallbackResult) => {
        console.log(1111111, err)
        msg('请求异常')
        reject(requestErrorResponse())
      },
    }

    uni.request({ ...defaultOptions, ...options })
  })
}

const noAuth = () => {
  uni.showToast({
    icon: 'error',
    title: '网络异常，请稍后重试',
    mask: true,
    duration: 2000,
    success: () => {
      // useLogin()
    },
  })
}

const requestErrorResponse = () => ({
  data: null,
  statusCode: 500,
  msg: '请求异常',
  success: false,
})

type ResponesData<T> = T extends UniApp.RequestSuccessCallbackResult['data']
  ? T
  : never

// // 处理异常
const resolveErrorRes = async (data: ResponesData<AnyObject>) => {
  if (data && +data.code === 208) {
    uni.showToast({
      icon: 'error',
      title: (data && data.message) || '请求异常',
      mask: true,
      duration: 2000,
    })
    uni.navigateTo({
      url: '/pages/BeenVip/index',
    })

    return Promise.resolve(requestErrorResponse())
  }

  if (data && +data.code === 401) {
    noAuth()
    return Promise.resolve(requestErrorResponse())
  }

  if (!data || +data.code !== 200) {
    uni.showToast({
      icon: 'error',
      title: (data && data.message) || '请求异常',
      mask: true,
      duration: 2000,
    })
    return Promise.reject(requestErrorResponse())
  }

  if (data && +data.code === 200) {
    return Promise.resolve(data as ResponseOptions['data'])
  }
}

export default request
