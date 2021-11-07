/**
 * useInterval
 * @description 定时器
 * @author WhiteFon
 * @create 2021-05-04 23:32
 */

import { useCallback, useEffect, useMemo, useRef } from 'react'

export type Params = [
  /** 要重复调用的函数 */
  () => void,
  /** 间隔时间，当取值为 null 或 undefined 时会使用默认值 1000 */
  number | undefined | null,
  {
    /** 控制是否在首次渲染时立即执行 */
    immediate: boolean
  }?
]

export interface Response {
  /** 获取当前定时器的状态 */
  getStatus: () => Status
  /** 操作定时器 工作 或 停止 */
  handle: (type: 'do' | 'stop', immediate?: boolean) => void
}

export type Status = 'doing' | 'stopping'

export default (...params: Params): Response => {
  const cacheRef = useRef<{
    /** 参数 */
    params: Params
    /** 定时器状态 */
    status: Status
    /** 定时器Id */
    timeId?: NodeJS.Timeout
  }>({
    params,
    status: 'stopping'
  })

  cacheRef.current.params = params

  // 创建定时器
  const createInterval = useCallback((immediate?: boolean) => {
    const [fn, interval] = cacheRef.current.params

    cacheRef.current.status = 'doing'

    if (immediate) {
      fn()
    }

    cacheRef.current.timeId = setInterval(
      () => cacheRef.current.params[0]?.(),
      typeof interval === 'number' ? interval : 1000
    )
  }, [])

  // 首次渲染时立即执行
  useMemo(() => {
    const [fn, interval, options] = cacheRef.current.params
    createInterval(options?.immediate)
  }, [])

  // 组件卸载时清除定时器
  useEffect(
    () => () => {
      cacheRef.current.status = 'stopping'
      clearInterval(cacheRef.current.timeId!)
    },
    []
  )

  return {
    getStatus: () => cacheRef.current.status,
    handle: (type, immediate) => {
      if (type === 'stop' && cacheRef.current.status === 'doing') {
        cacheRef.current.status = 'stopping'
        clearInterval(cacheRef.current.timeId!)
      } else if (type === 'do' && cacheRef.current.status === 'stopping') {
        createInterval(immediate)
      } else if (type === 'do' && immediate) {
        cacheRef.current.status = 'stopping'
        clearInterval(cacheRef.current.timeId!)
        createInterval(immediate)
      }
    }
  }
}
