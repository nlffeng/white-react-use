import { renderHook, act } from '@testing-library/react-hooks'
import { useToggleArray } from '../src'

describe('useToggleArray', () => {
  it('测试返回值是正确的', () => {
    const { result } = renderHook(() => useToggleArray())

    expect(Array.isArray(result.current)).toBeTruthy()
    expect(result.current).toHaveLength(3)

    expect(typeof result.current[0]).toBe('function')
    expect(result.current[1]).toEqual([])
    expect(result.current[2]).toBeInstanceOf(Function)
  })

  it('测试默认参数', () => {
    const { result } = renderHook(() => useToggleArray(['abc', 'def']))

    expect(result.current[1]).toEqual(['abc', 'def'])
  })

  describe('测试 toggleFn 和 setArr 函数', () => {
    it('toggleFn 函数，带 1 个参数', () => {
      const { result } = renderHook(() => useToggleArray())

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc')
      })
      expect(result.current[1]).toEqual(['abc'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('def')
      })
      expect(result.current[1]).toEqual(['abc', 'def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc')
      })
      expect(result.current[1]).toEqual(['def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('def')
      })
      expect(result.current[1]).toEqual([])
    })

    it('toggleFn 函数，带 2 个参数', () => {
      const { result } = renderHook(() => useToggleArray())

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'save')
      })
      expect(result.current[1]).toEqual(['abc'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('def', 'save')
      })
      expect(result.current[1]).toEqual(['abc', 'def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'save')
      })
      expect(result.current[1]).toEqual(['abc', 'def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'remove')
      })
      expect(result.current[1]).toEqual(['def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'remove')
      })
      expect(result.current[1]).toEqual(['def'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('def', 'remove')
      })
      expect(result.current[1]).toEqual([])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('ghi', (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual(['ghi'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('zxy', (target: any, item: any): boolean => false)
      })
      expect(result.current[1]).toEqual(['ghi', 'zxy'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('ghi', (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual(['zxy'])
    })

    it('toggleFn 函数，带 3 个参数', () => {
      const { result } = renderHook(() => useToggleArray())

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', undefined, (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual(['abc'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', undefined, (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual([])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'save', (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual(['abc'])

      act(() => {
        const [toggleFn] = result.current
        toggleFn('abc', 'remove', (target: any, item: any): boolean => target === item)
      })
      expect(result.current[1]).toEqual([])
    })

    it('setArr 函数', () => {
      const { result } = renderHook(() => useToggleArray())

      act(() => {
        const [, , setArr] = result.current
        setArr(['abc', 'def'])
      })
      expect(result.current[1]).toEqual(['abc', 'def'])
    })
  })
})
