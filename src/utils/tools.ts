export function msg(content: any, time = 3000) {
  return new Promise((resolve) => {
    uni.showToast({
      icon: 'none',
      title: content,
      duration: time,
      mask: true,
      success() {
        resolve('success')
      },
    })
  })
}

export function showLoading(content = '努力加載中...', mask = true) {
  uni.showLoading({
    title: content,
    mask: mask,
  })
}

export function hideLoading(timer = 0) {
  if (timer > 0) {
    var t = setTimeout(function () {
      uni.hideLoading()
      clearTimeout(t)
    }, timer)
  } else {
    uni.hideLoading()
  }
  return Promise.resolve()
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

export function showModal(options: UniApp.ShowModalOptions = {}) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: '该操作存在风险, 是否继续?',
      success: ({ cancel, confirm }) => {
        confirm && resolve(true)
        cancel && reject(false)
      },
      ...options,
    })
  })
}

export function back() {
  uni.navigateBack({})
}
