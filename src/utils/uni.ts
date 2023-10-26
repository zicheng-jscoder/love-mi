export function uniapp(
  key: keyof UniApp.Uni,
  options: UniApp.Uni[keyof UniApp.Uni] | {} = {}
) {
  return new Promise<any>(function (resolve, reject) {
    const defaultOptions = {
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        reject(err)
      },
    }
    const uniFn = uni[key] as any

    uniFn({ ...defaultOptions, ...options })
  })
}
