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

// 节流
export const throttle = (
  callback: Function,
  duration: number | 'requestAnimationFrame' = 300
): Function => {
  let running: boolean = false

  if (duration === 'requestAnimationFrame') {
    return function wrapFn(...args: any[]) {
      if (running) return

      running = true

      window.requestAnimationFrame(() => {
        callback(...args)
        running = false
      })
    }
  }

  return function wrapFn(...args: any[]) {
    if (running) return

    running = true
    callback(...args)

    setTimeout(() => {
      running = false
    }, duration)
  }
}

// 防抖
export const debounce = (callback: Function, duration: number = 300): Function => {
  let timer: any

  return function wrapFn(...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback(...args)
    }, duration)
  }
}
