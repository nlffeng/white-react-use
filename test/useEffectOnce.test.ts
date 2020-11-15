import { renderHook } from '@testing-library/react-hooks'
import { useEffectOnce } from '../src'

describe('useEffectOnce', () => {
  it('执行一次 useEffect', () => {
    let count = 0
    const { rerender } = renderHook(() =>
      useEffectOnce(() => {
        count += 1
      })
    )
    rerender()
    rerender()
    expect(count).toBe(1)
  })
})
