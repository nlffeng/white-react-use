import { renderHook } from '@testing-library/react-hooks'
import { useInterval } from '../src'

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('定时执行', () => {
    const callback = jest.fn()

    const { result, rerender } = renderHook(() => {
      useInterval(callback, 800)
    })

    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled()

    // “快进”时间使得所有定时器回调被执行
    jest.advanceTimersByTime(800)

    // 现在回调函数应该被调用了！
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('立即执行一次，而后定时执行', () => {
    const callback = jest.fn()

    const { result, rerender } = renderHook(() => {
      useInterval(callback, undefined, { immediate: true })
    })

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)

    // “快进”时间使得所有定时器回调被执行
    jest.advanceTimersByTime(1000)

    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('定时器的状态', () => {
    const callback = jest.fn()
    let _getStatus: Function = () => {}
    let _handle: Function = () => {}

    const { result, rerender } = renderHook(() => {
      const { getStatus, handle } = useInterval(callback, 800)
      _getStatus = getStatus
      _handle = handle
    })

    expect(callback).not.toBeCalled()
    expect(_getStatus?.()).toBe('doing')

    _handle?.('stop')

    expect(callback).not.toBeCalled()
    expect(_getStatus?.()).toBe('stopping')

    // “快进”时间使得所有定时器回调被执行
    jest.advanceTimersByTime(800)

    expect(callback).not.toBeCalled()
    expect(_getStatus?.()).toBe('stopping')

    _handle('do', true)
  })

  it('手动操作定时器', () => {
    const callback = jest.fn()
    let _getStatus: Function = () => {}
    let _handle: Function = () => {}

    const { result, rerender } = renderHook(() => {
      const { getStatus, handle } = useInterval(callback, 800)
      _getStatus = getStatus
      _handle = handle
    })

    expect(_getStatus?.()).toBe('doing')

    _handle?.('stop')

    expect(_getStatus?.()).toBe('stopping')

    _handle?.('do', true)

    expect(_getStatus?.()).toBe('doing')
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)

    _handle?.('do', true)

    expect(_getStatus?.()).toBe('doing')
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
