import { renderHook } from '@testing-library/react-hooks'
import { useFirstMountState } from '../src'

describe('useFirstMountState', () => {
  it('判断组件是否第一次挂载', () => {
    const { result, rerender } = renderHook(() => useFirstMountState())

    expect(result.current).toBeTruthy()

    for (let i = 0; i < 5; i += 1) {
      rerender()
      expect(result.current).toBeFalsy()
    }
  })
})
