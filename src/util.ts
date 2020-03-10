export interface ResolveQueryRet {
  [propName: string]: any
}

export function resolveQuery(str: any): ResolveQueryRet {
  const ret: ResolveQueryRet = {}

  if (typeof str !== 'string') {
    return ret
  }

  str = decodeURIComponent(str)
  const i = str.indexOf('?')
  i !== -1 && (str = str.substring(i + 1))

  if (!str.trim()) {
    return ret
  }

  const kvs = str.split('&')
  kvs.forEach((it: string) => {
    const kvStr = it.trim()

    if (!kvStr) {
      return
    }

    const kvArr = kvStr.split('=')
    if (!kvArr[0]) {
      return
    }
    ret[kvArr[0]] = kvArr[1]
  })

  return ret
}
