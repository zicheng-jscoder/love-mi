// str: 输入字符串 length:要剩下的长度 prefix: 截取后补上的后缀
export const keepLength = (
  str: string,
  length: number,
  prefix: string = '...'
) =>
  str.length > length ? str.slice(0, length) + prefix : str.slice(0, length)

// 异步等待多少时间
export const waitTime = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

// 截取url hash search部分参数 返回 {hash: {}, search: {}}
export function getUrlParams(url: string) {
  let params: {
    hash: { [k: string]: string }
    search: { [k: string]: string }
  } = { hash: {}, search: {} }
  let hashIndex = url.indexOf('#')
  let searchIndex = url.indexOf('?')
  let hashStr = ''
  let searchStr = ''
  if (hashIndex > -1) {
    hashStr = url.substring(hashIndex + 1)?.split('?')[1] || ''
    url = url.substring(0, hashIndex)
  }
  if (searchIndex > -1) {
    searchStr = url.substring(searchIndex + 1)
    url = url.substring(0, searchIndex)
  }
  let hashParams = hashStr.split('&').filter((item) => !!item)
  let searchParams = searchStr.split('&').filter((item) => !!item)
  for (let i = 0; i < hashParams.length; i++) {
    let item = hashParams[i].split('=')
    params.hash[item[0]] = item[1]
  }
  for (let i = 0; i < searchParams.length; i++) {
    let item = searchParams[i].split('=')
    params.search[item[0]] = item[1]
  }
  return params
}

// 拼接链接参数 传进{a: 1, b: 2, c: 3} 返回 a=1&b=2&c=3
export function conbineUrlParams(paramsMap: AnyObject) {
  return Object.keys(paramsMap)
    .map((key) => `${key}=${paramsMap[key]}`)
    .join('&')
}

export function getUrlInfo(url: string) {
  const baseUrl = url.split('?')[0].split('#')[0]
  const hash = ~url.indexOf('#') ? '#' + url.split('#')[1].split('?')[0] : ''
  return {
    hash,
    baseUrl,
  }
}

export function getValueByKey<T = AnyObject>(targetMap: T, vkey: string) {
  if (!targetMap) return targetMap

  let res: any = targetMap
  vkey.split('.').map((k: string) => (res = res[k as keyof T]))

  return res
}

export function uuid(len: number = 16, radix: number = 16) {
  var chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

export function deepClone<T = any>(obj: T) {
  let objClone: any = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        objClone[key] = deepClone(obj[key])
      } else {
        objClone[key] = obj[key]
      }
    }
  }
  return objClone as T
}
