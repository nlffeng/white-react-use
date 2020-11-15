/**
 * useListenHotKeyboard(绑定键盘快捷键)
 */

import { useRef } from 'react'
import useEffectOnce from './useEffectOnce'

interface SingleHotkey {
  bindElement?: HTMLElement
  key: string | number | Array<string | number>
  useCapture?: boolean
}

type Params = SingleHotkey | Array<SingleHotkey>

export default function useListenHotKeyboard(params: Params): void {
  // tslint:disable-next-line: strict-type-predicates
  if (typeof params !== 'object') {
    return
  }

  const hotkeyRef = useRef<Array<SingleHotkey>>([])
  hotkeyRef.current = Array.isArray(params) ? params : [params]

  useEffectOnce(() => {
    const handleCallback = (event: KeyboardEvent) => {
      // TODO...
    }

    document.addEventListener('keydown', handleCallback)

    return () => {
      document.removeEventListener('keydown', handleCallback)
    }
  })
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
