/**
 * useListenHotKeyboard(绑定键盘快捷键)
 */

import { useRef, useCallback, KeyboardEvent } from 'react'

type BaseKey = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'

interface Params {
  baseKey: BaseKey | Array<BaseKey>
  effectKey: number | Array<number>
  handleCallback?: (msg: string, i: number, event: KeyboardEvent) => void
  expiredCallback?: (i: number) => void
}

export default function useListenHotKeyboard(params: Params): any {
  const paramsRef = useRef<Params>(params)
  const effectIndexRef = useRef<number>(0)
  const timerRef = useRef<number>()

  paramsRef.current.handleCallback = params.handleCallback
  paramsRef.current.expiredCallback = params.expiredCallback

  const handleCallback = useCallback((event: KeyboardEvent) => {
    const params = paramsRef.current
    const baseKey = typeof params.baseKey === 'string' ? [params.baseKey] : params.baseKey
    const effectKey = typeof params.effectKey === 'number' ? [params.effectKey] : params.effectKey
    let isBasePass = true

    for (let i = 0; i < baseKey.length; i += 1) {
      isBasePass = event[baseKey[i]]
      if (!isBasePass) return
    }

    if (effectKey[effectIndexRef.current] === event.keyCode) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      effectIndexRef.current += 1
      if (effectIndexRef.current >= effectKey.length) {
        if (params.handleCallback) {
          params.handleCallback('', effectIndexRef.current, event)
        }
      } else {
        const msg = `组合键已生效，正在等待按下第${effectIndexRef.current + 1}键...`
        console.log(msg)

        if (params.handleCallback) {
          params.handleCallback(msg, effectIndexRef.current, event)
        }

        timerRef.current = window.setTimeout(() => {
          if (params.expiredCallback) {
            params.expiredCallback(effectIndexRef.current)
          }
          effectIndexRef.current = 0
          timerRef.current = undefined
        }, 4000)
      }
    }
  }, [])

  return {
    onKeyDown: handleCallback
  }
}

// useListenHotKeyboard({
//   bindElement: document
//   key: '' | 13 | [91, 13, 'alt']
//   useCapture: false
// })

/*
  组合键方式
  - 1、一次性生效组合键(基础键+生效键)，多个按键同时生效
  - 2、连续性生效组合键(基础键+生效键)，先由2个或3个(一次性组合键)触发，再按下后续目标键(基础键+生效键)生效
    - 设定连续按键过期时间
      - 过期时间内输入键将生效并重新计时，过期后自动作废前面的组合
      - 存在有些组合键的前面路径相同，在过期时间内输入键将生效，否则将会触发该组合键的能力
    - 提示引导输入下个键
      - 内部默认有个提示组件
      - 由外部提供提示组件
*/
