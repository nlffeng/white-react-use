import { renderHook, act } from '@testing-library/react-hooks'
import { useControlState } from '../src'

describe('useControlState', () => {
  it('无默认值不受控状态', () => {
    const { result } = renderHook(() => useControlState())

    expect(result.current[0]).toBeUndefined()

    act(() => {
      const setData = result.current[1]
      setData(2)
    })
    expect(result.current[0]).toEqual(2)
  })

  it('默认不受控状态', () => {
    const { result } = renderHook(() => useControlState({ initialValue: 0 }))

    expect(result.current[0]).toEqual(0)

    act(() => {
      const setData = result.current[1]
      setData(2)
    })
    expect(result.current[0]).toEqual(2)

    act(() => {
      const setData = result.current[1]
      setData(5)
    })
    expect(result.current[0]).toEqual(5)
  })

  it('明确不受控状态', () => {
    const { result } = renderHook(() => useControlState({ initialValue: 0, isControl: false }))

    expect(result.current[0]).toEqual(0)

    act(() => {
      const setData = result.current[1]
      setData(2)
    })
    expect(result.current[0]).toEqual(2)
  })

  it('受控状态且默认值无效', () => {
    const { result: result1 } = renderHook(() =>
      useControlState({ initialValue: 0, isControl: true })
    )

    expect(result1.current[0]).toBeUndefined()

    act(() => {
      const setData = result1.current[1]
      setData(2)
    })
    expect(result1.current[0]).toBeUndefined()

    let value: number | undefined = 0
    const { result: result2, rerender } = renderHook(
      v =>
        useControlState({
          value: v,
          isControl: true,
          onChange: v => (value = v)
        }),
      { initialProps: value }
    )

    expect(result2.current[0]).toEqual(0)

    act(() => {
      const setData = result2.current[1]
      setData(2)
    })
    rerender(value)

    expect(result2.current[0]).toEqual(2)
  })
})
