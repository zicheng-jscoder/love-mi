export default class URL {
  href: string
  protocol: string
  host: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  origin: string

  constructor(url: string) {
    const parsedURL = this.parseURL(url)

    this.href = parsedURL.href
    this.protocol = parsedURL.protocol
    this.host =
      parsedURL.hostname + (parsedURL.port ? `:${parsedURL.port}` : '')
    this.hostname = parsedURL.hostname
    this.port = parsedURL.port
    this.pathname = parsedURL.pathname
    this.search = parsedURL.search
    this.hash = parsedURL.hash
    this.origin = parsedURL.origin
  }

  private parseURL(url: string): any {
    const result: any = {}

    const protocolEnd = url.indexOf('://')
    if (protocolEnd > -1) {
      result.protocol = url.substring(0, protocolEnd)
      url = url.substring(protocolEnd + 3)
    }

    const pathStart = url.indexOf('/')
    let authority, pathQueryHash
    if (pathStart > -1) {
      authority = url.substring(0, pathStart)
      pathQueryHash = url.substring(pathStart)
    } else {
      authority = url
      pathQueryHash = '/'
    }

    const parts = authority.split('@')
    if (parts.length === 2) {
      const userinfo = parts[0].split(':')
      result.username = userinfo[0]
      result.password = userinfo[1]
      result.hostname = parts[1]
    } else {
      result.hostname = parts[0]
    }

    const portStart = result.hostname.indexOf(':')
    if (portStart > -1) {
      result.port = result.hostname.substring(portStart + 1)
      result.hostname = result.hostname.substring(0, portStart)
    }

    const hashStart = pathQueryHash.indexOf('#')
    if (hashStart > -1) {
      result.hash = pathQueryHash.substring(hashStart)
      pathQueryHash = pathQueryHash.substring(0, hashStart)
    }

    const queryStart = pathQueryHash.indexOf('?')
    if (queryStart > -1) {
      result.search = pathQueryHash.substring(queryStart)
      result.pathname = pathQueryHash.substring(0, queryStart)
    } else {
      result.pathname = pathQueryHash
    }

    result.href = url
    result.origin = result.protocol
      ? `${result.protocol}//${result.hostname}`
      : ''

    return result
  }
}
