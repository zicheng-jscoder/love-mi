import request from '@/utils/request'

//获取首页配置
export const getCosAuth = () =>
  request({
    url: '/basic/sts-token',
    method: 'GET',
  })
