/**
 * useWindowSize(浏览器窗口尺寸)
 */

import { useState } from 'react'
import useEffectOnce from './useEffectOnce'
import { throttle, debounce } from './util'

export type Throttle = 'throttle'
export type Debounce = 'debounce'
export type Duration = number | 'requestAnimationFrame'

export interface WindowSize {
  innerWidth: number
  innerHeight: number
  outerWidth: number
  outerHeight: number
}

const initialState = () => ({
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight
})

export default function useWindowSize(mode?: Throttle, duration?: Duration): WindowSize
export default function useWindowSize(mode: Debounce, duration?: number): WindowSize
export default function useWindowSize(mode: any = 'throttle', duration: any): any {
  const [windowSize, setWinSize] = useState<WindowSize>(initialState)

  useEffectOnce(() => {
    let handleResize: any = () => {
      setWinSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight
      })
    }

    if (mode === 'throttle') {
      handleResize = throttle(
        handleResize,
        duration || duration === 0 ? duration : 'requestAnimationFrame'
      )
    } else if (mode === 'debounce') {
      handleResize = debounce(handleResize, duration)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return windowSize
}
