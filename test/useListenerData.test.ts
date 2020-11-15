import { renderHook } from '@testing-library/react-hooks'
import { useListenerData } from '../src'

describe('useListenerData', () => {
  it('监听某个数据变化正确响应', () => {
    let count = 0
    const { rerender } = renderHook(
      listenData =>
        useListenerData([listenData], () => {
          count += 1
        }),
      {
        initialProps: 0
      }
    )
    expect(count).toBe(1)
    rerender(1)
    expect(count).toBe(2)
    rerender(2)
    expect(count).toBe(3)
    rerender(2)
    expect(count).toBe(3)
  })

  it('监听一组数据变化正确响应', () => {
    let count = 0
    const { rerender } = renderHook(
      listenData =>
        useListenerData(listenData, () => {
          count += 1
        }),
      {
        initialProps: [2, 5]
      }
    )
    expect(count).toBe(1)
    rerender([3, 5])
    expect(count).toBe(2)
    rerender([3, 6])
    expect(count).toBe(3)
    rerender([3, 6])
    expect(count).toBe(3)
  })
})
