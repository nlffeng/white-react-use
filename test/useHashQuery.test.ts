import { renderHook } from '@testing-library/react-hooks'
import { useHashQuery } from '../src'

describe('useHashQuery', () => {
  it('地址栏参数，返回的值应该是正确的', () => {
    window.location.hash = '#demo?a=b&c=d&e&f=&=g'
    const { result } = renderHook(() => useHashQuery())
    expect(result.current).toEqual({
      a: 'b',
      c: 'd',
      e: undefined,
      f: ''
    })
  })

  it('地址栏无参数，返回值应该是空对象', () => {
    window.location.hash = '#demo'
    const { result } = renderHook(() => useHashQuery())
    expect(result.current).toEqual({})
  })

  it('传入 deps 依赖项，重新解析地址栏参数', () => {
    const props = { triggleValue: 1 }

    window.location.hash = '#demo?a=b'
    const { result, rerender } = renderHook(props => useHashQuery([props.triggleValue]), {
      initialProps: props
    })
    expect(result.current).toEqual({ a: 'b' })

    window.location.hash = '#demo?a=d'
    rerender(props)
    expect(result.current).toEqual({ a: 'b' })

    window.location.hash = '#demo?a=d'
    props.triggleValue = 2
    rerender(props)
    expect(result.current).toEqual({ a: 'd' })
  })
})
