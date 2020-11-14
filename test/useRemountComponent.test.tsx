import React, { FunctionComponent, useEffect } from 'react'
import { create, act } from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'
import { useRemountComponent, useRemountKey } from '../src'

describe('useRemountKey', () => {
  it('监听某个数据正确返回新值', () => {
    let listenData = 1
    let lastKey

    const { result, rerender } = renderHook((listenFactor) => useRemountKey({
      listenFactor,
    }), { initialProps: listenData })

    expect(result.current).toBe(0)
    lastKey = result.current

    rerender(listenData = 2)
    expect(result.current).not.toEqual(lastKey)
    expect(typeof result.current).toBe('number')
    lastKey = result.current

    rerender(listenData)
    expect(result.current).toEqual(lastKey)
    expect(typeof result.current).toBe('number')
  })

  it('监听某个数据，回调函数处理是否返回新值', () => {
    let listenData = 1
    let lastKey

    const { result, rerender } = renderHook((listenFactor) => useRemountKey({
      listenFactor,
      isRemountFn: (v) => {
        return v === 4
      },
    }), { initialProps: listenData })

    expect(result.current).toBe(0)
    lastKey = result.current

    rerender(listenData = 2)
    expect(result.current).toEqual(lastKey)

    rerender(listenData = 4)
    expect(result.current).not.toEqual(lastKey)
  })

  it('监听一组数据，回调函数处理是否返回新值', () => {
    let listenFactors = [1, 3, 4]
    let lastKey

    const { result, rerender } = renderHook((listenFactors) => useRemountKey({
      listenFactors,
      isRemountFn: (v) => {
        return v[2] === 5
      }
    }), { initialProps: listenFactors })

    expect(result.current).toBe(0)
    lastKey = result.current

    rerender(listenFactors = [2, 1, 4])
    expect(result.current).toEqual(lastKey)

    rerender(listenFactors = [2, 1, 5])
    expect(result.current).not.toEqual(lastKey)
  })

  it('监听多组数据，回调函数处理是否返回新值', () => {
    let lastKey

    const { result, rerender } = renderHook((listenFactors) => useRemountKey([
      {
        listenFactor: listenFactors.a,
        isRemountFn: (v) => {
          return v === 5
        },
      },
      {
        listenFactors: listenFactors.b,
        isRemountFn: (v) => {
          return v[2] === 9
        },
      },
    ]), { initialProps: { a: 1, b: [2, 4, 5] } })

    expect(result.current).toBe(0)
    lastKey = result.current

    rerender({ a: 1, b: [2, 4, 5] })
    expect(result.current).toEqual(lastKey)

    rerender({ a: 5, b: [2, 4, 5] })
    expect(result.current).not.toEqual(lastKey)
    lastKey = result.current

    rerender({ a: 2, b: [2, 4, 7] })
    expect(result.current).toEqual(lastKey)

    rerender({ a: 2, b: [2, 4, 9] })
    expect(result.current).not.toEqual(lastKey)
  })
})

describe('useRemountComponent', () => {
  let count = 0
  const Test: FunctionComponent = () => {
    useEffect(() => {
      count += 1
    }, [])
    return null
  }

  it('监听某个数据，传入的组件正确重新挂载', () => {
    let listenFactor = 1
    const { result, rerender } = renderHook((listenFactor) => useRemountComponent(Test, { listenFactor }), { initialProps: listenFactor })
    const App = result.current

    let root: any
    act(() => {
      root = create(<App />)
    })
    expect(count).toEqual(1)

    rerender(listenFactor)
    act(() => {
      root.update(<App />)
    })
    expect(count).toEqual(1)

    rerender(listenFactor = 2)
    act(() => {
      root.update(<App />)
    })
    expect(count).toEqual(2)
    count = 0
  })

  it('监听一组数据，回调函数处理传入的组件正确重新挂载', () => {
    let listenFactors = [1, 3, 4]
    const { result, rerender } = renderHook(
      (listenFactor) => useRemountComponent(Test, {
        listenFactors,
        isRemountFn: (v) => {
          return v[2] === 5
        },
      }),
      {
        initialProps: listenFactors,
      }
    )
    const App = result.current

    let root: any
    act(() => {
      root = create(<App />)
    })
    expect(count).toEqual(1)

    rerender(listenFactors = [2, 1, 4])
    act(() => {
      root.update(<App />)
    })
    expect(count).toEqual(1)

    rerender(listenFactors = [2, 1, 5])
    act(() => {
      root.update(<App />)
    })
    expect(count).toEqual(2)
  })
})
