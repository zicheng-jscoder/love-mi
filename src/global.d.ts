declare module 'uview-plus'

declare module 'cos-wx-sdk-v5' {
  export default class COS {
    constructor({
      SecretId,
      SecretKey,
      SimpleUploadMethod,
      getAuthorization,
    }: {
      SecretId?: string
      SecretKey?: string
      SimpleUploadMethod?: string
      getAuthorization: (
        obj: { Scope: any },
        callback: (cb: AnyObject) => void
      ) => void
    }) {}

    postObject(obj: any, cb: any) {}
  }
}

// 请求参数封装
interface CustomRequestOptions extends UniApp.RequestOptions {
  params?: AnyObject
  baseUrl?: string
  loading?: boolean
}

// 后端响应结构
interface ResponseOptions<T = any> {
  data: {
    code: number
    result?: T
    data?: T
    httpStatus: string
    msg: string | null
    success: boolean
    version?: string
  }
}

interface IPagation<T = any> {
  items: T[]
  total: number
}

// store module extensions
declare namespace IStore {
  interface UserTypes {}
  interface RootStateType {
    user: UserTypes
  }

  interface ModuleState extends RootStateType {}
}

interface IEvent extends Eevent {
  detail: {
    value: any
    current: number | string
  }
}
