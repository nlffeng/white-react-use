/// <reference path="./common.d.ts" />

import { renderHook, act } from '@testing-library/react-hooks'
import { replaceRaf } from 'raf-stub'
import { useWindowSize } from '../src'

declare var requestAnimationFrame: {
  reset: Function
  step: (steps?: number, duration?: number) => void
}

describe('useWindowSize', () => {
  beforeAll(() => {
    replaceRaf()
    ;(window as any).innerWidth = 1024
    ;(window as any).innerHeight = 1024
    ;(window as any).outerWidth = 1024
    ;(window as any).outerHeight = 1024
  })

  afterEach(() => {
    requestAnimationFrame.reset()
    ;(window as any).innerWidth = 1024
    ;(window as any).innerHeight = 1024
    ;(window as any).outerWidth = 1024
    ;(window as any).outerHeight = 1024
  })

  function getHook(...args: any[]) {
    return renderHook(() => useWindowSize(...args))
  }

  function triggerResize(
    dimension: 'innerWidth' | 'innerHeight' | 'outerWidth' | 'outerHeight',
    value: number
  ) {
    if (dimension === 'innerWidth') {
      ;(window as any).innerWidth = value
    } else if (dimension === 'innerHeight') {
      ;(window as any).innerHeight = value
    } else if (dimension === 'outerWidth') {
      ;(window as any).outerWidth = value
    } else if (dimension === 'outerHeight') {
      ;(window as any).outerHeight = value
    }

    window.dispatchEvent(new Event('resize'))
  }

  it('默认使用 requestAnimationFrame 节流(throttle)方式', () => {
    const { result } = getHook()

    expect(typeof result.current.innerWidth).toBe('number')
    expect(typeof result.current.innerHeight).toBe('number')
    expect(typeof result.current.outerWidth).toBe('number')
    expect(typeof result.current.outerHeight).toBe('number')

    act(() => {
      triggerResize('innerWidth', 100)
    })

    expect(result.current.innerWidth).not.toBe(100)

    act(() => {
      triggerResize('innerWidth', 200)
    })

    expect(result.current.innerWidth).not.toBe(200)

    act(() => {
      requestAnimationFrame.step()
    })

    expect(result.current.innerWidth).toBe(200)

    act(() => {
      triggerResize('innerWidth', 300)
      requestAnimationFrame.step()
    })

    expect(result.current.innerWidth).toBe(300)

    act(() => {
      requestAnimationFrame.step()
    })

    expect(result.current.innerWidth).toBe(300)
  })

  it('使用节流(throttle)方式', () => {
    jest.useFakeTimers()

    const { result } = getHook('throttle', 800)

    act(() => {
      triggerResize('innerWidth', 100)
      triggerResize('innerWidth', 200)
      triggerResize('innerWidth', 300)
    })

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 800)
    expect(result.current.innerWidth).toBe(100)

    act(() => {
      triggerResize('innerWidth', 400)
    })

    expect(result.current.innerWidth).toBe(100)

    jest.runAllTimers()

    act(() => {
      triggerResize('innerWidth', 500)
      triggerResize('innerWidth', 600)
    })

    expect(result.current.innerWidth).toBe(500)
  })

  it('使用防抖(debounce)方式，默认 300 ms', () => {
    jest.useFakeTimers()

    const { result } = getHook('debounce')

    act(() => {
      triggerResize('innerWidth', 100)
      triggerResize('innerWidth', 200)
      triggerResize('innerWidth', 300)
    })

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 300)

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current.innerWidth).toBe(300)
  })

  it('使用防抖(debounce)方式', () => {
    jest.useFakeTimers()

    const { result } = getHook('debounce', 800)

    act(() => {
      triggerResize('innerWidth', 100)
      triggerResize('innerWidth', 200)
      triggerResize('innerWidth', 300)
    })

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 800)

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current.innerWidth).toBe(300)

    act(() => {
      triggerResize('innerWidth', 400)
      triggerResize('innerWidth', 500)
    })

    expect(result.current.innerWidth).toBe(300)

    act(() => {
      jest.runAllTimers()
    })

    expect(result.current.innerWidth).toBe(500)
  })
})
