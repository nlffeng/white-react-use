import { resolveQuery } from '../src/util'

describe('resolveQuery', () => {
  test('测试返回值是正确的', () => {
    expect(resolveQuery('')).toEqual({})
    expect(resolveQuery('?')).toEqual({})
    expect(resolveQuery('?a=b&c=d')).toEqual({ a: 'b', c: 'd' })
    expect(resolveQuery('a=b&c=d')).toEqual({ a: 'b', c: 'd' })
    expect(resolveQuery('a&c=d')).toEqual({ a: undefined, c: 'd' })
    expect(resolveQuery('a&c=d')).toEqual({ a: undefined, c: 'd' })
    expect(resolveQuery('&c=d')).toEqual({ a: undefined, c: 'd' })
    expect(resolveQuery('&=f')).toEqual({})
  })

  test('传入非字符串，返回空对象', () => {
    expect(resolveQuery(1111 as any)).toEqual({})
    expect(resolveQuery({} as any)).toEqual({})
    expect(resolveQuery([] as any)).toEqual({})
    expect(resolveQuery((() => {}) as any)).toEqual({})
  })
})
