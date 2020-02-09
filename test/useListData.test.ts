import { renderHook, act } from '@testing-library/react-hooks'
import { useListData } from '../src'
import { LoadApi, LoadDataParams, Options } from '../src/useListData'

describe('useListData', () => {
  it('测试返回值是正确的', () => {
    const loadApi = () => {
      return new Promise((resolve, reject) => {
        // ...
      })
    }

    const { result } = renderHook(() => useListData(loadApi))
    const value = result.current

    expect(Array.isArray(value)).toBeTruthy()
    expect(value).toHaveLength(5)

    const firstV = value[0]
    expect(Array.isArray(firstV)).toBeTruthy()
    expect(firstV).toHaveLength(0)

    const secondV = value[1]
    expect(secondV).toBeInstanceOf(Function)
    const secondState = [1]
    act(() => {
      secondV(secondState)
    })
    expect(result.current[0]).toBe(secondState)

    const thirdV = value[2]
    expect(thirdV).toEqual({
      current: 1,
      pageSize: 10,
      total: 0
    })

    const fourthV = value[3]
    expect(fourthV).toBeInstanceOf(Function)
    const fourthState = {
      current: 2,
      pageSize: 20,
      total: 100
    }
    act(() => {
      fourthV(fourthState)
    })
    expect(result.current[2]).toBe(fourthState)

    const fifthV = value[4]
    expect(typeof fifthV).toBe('function')
  })

  describe('测试返回值中的 loadData 方法', () => {
    let ret: any

    let loadApiParams: LoadDataParams
    const loadApi: LoadApi = params =>
      new Promise(resolve => {
        loadApiParams = params
        setTimeout(() => {
          resolve(ret)
        })
      })

    it('测试 mode：update', async () => {
      const params = {
        pageNum: 2,
        pageSize: 20
      }
      const { result } = renderHook(() => useListData(loadApi))

      let loadDataV: any

      // 第一次返回值
      ret = {
        list: [100],
        total: 100
      }
      await act(async () => {
        loadDataV = await result.current[4](params)
      })
      expect(loadApiParams).toBe(params)
      expect(typeof loadDataV).toBe('object')
      expect(loadDataV.list).toEqual([100])
      expect(loadDataV.total).toBe(100)
      expect(result.current[0]).toEqual([100])
      expect(result.current[2].total).toBe(100)

      // 第二次返回值
      ret = {
        list: [200],
        total: 200
      }
      await act(async () => {
        loadDataV = await result.current[4](params)
      })
      expect(typeof loadDataV).toBe('object')
      expect(loadDataV.list).toEqual([200])
      expect(loadDataV.total).toBe(200)
      expect(result.current[0]).toEqual([200])
      expect(result.current[2].total).toBe(200)
    })

    it('测试 mode: add', async () => {
      const params = { current: 1, pageSize: 10 }
      const { result } = renderHook(() => useListData(loadApi, { mode: 'add' }))

      let loadDataV: any

      // 第一次返回值
      ret = {
        list: [100],
        total: 100
      }
      await act(async () => {
        loadDataV = await result.current[4](params)
      })
      expect(loadApiParams).toBe(params)
      expect(typeof loadDataV).toBe('object')
      expect(loadDataV.list).toEqual([100])
      expect(loadDataV.total).toBe(100)
      expect(result.current[0]).toEqual([100])
      expect(result.current[2].total).toBe(100)

      // 第二次返回值
      ret = {
        list: [200],
        total: 200
      }
      await act(async () => {
        loadDataV = await result.current[4](params)
      })
      expect(typeof loadDataV).toBe('object')
      expect(loadDataV.list).toEqual([200])
      expect(loadDataV.total).toBe(200)
      expect(result.current[0]).toEqual([100, 200])
      expect(result.current[2].total).toBe(200)
    })

    it('测试 loadData 在 mode 为 update 模式下参数为空和结果为空值', async () => {
      ret = null
      const { result } = renderHook(() => useListData(loadApi))

      let loadDataV: any
      await act(async () => {
        loadDataV = await result.current[4]()
      })
      expect(loadApiParams).toEqual({})
      expect(loadDataV).toEqual({})
      expect(result.current[0]).toEqual([])
      expect(result.current[2].total).toBe(0)
    })

    it('测试 loadData 在 mode 为 add 模式下参数为空和结果为空值', async () => {
      ret = null
      const { result } = renderHook(() => useListData(loadApi, { mode: 'add' }))

      let loadDataV: any
      await act(async () => {
        loadDataV = await result.current[4]()
      })
      expect(loadApiParams).toEqual({})
      expect(loadDataV).toEqual({})
      expect(result.current[0]).toEqual([])
      expect(result.current[2].total).toBe(0)
    })

    it('测试 loadData 结果失败', async () => {
      const { result } = renderHook(() =>
        useListData(
          () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                reject('Network Error')
              })
            })
        )
      )

      let loadDataV: any
      let error!: string
      await act(async () => {
        try {
          loadDataV = await result.current[4]({ current: 1, pageSize: 10 })
        } catch (e) {
          error = e
        }
      })
      expect(loadDataV).toBeUndefined()
      expect(error).toBe('Network Error')
    })
  })

  it('测试 options 为自定义值', async () => {
    const options: Options = {
      currentAlias: 'pageNumAlias',
      totalAlias: 'totalAlias',
      pageSizeAlias: 'pageSizeAlias',
      listAlias: 'listAlias',
      current: 2,
      pageSize: 20,
      total: 10,
      mode: 'update'
    }

    const loadApi: LoadApi = () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            listAlias: [100],
            totalAlias: 100
          })
        })
      })

    const { result } = renderHook(() => useListData(loadApi, options))

    expect(result.current[0]).toEqual([])
    expect(result.current[2]).toEqual({
      current: 2,
      pageSize: 20,
      total: 10
    })

    let loadDataV: any
    await act(async () => {
      loadDataV = await result.current[4]({ pageNumAlias: 3, pageSizeAlias: 30 })
    })

    expect(result.current[0]).toEqual([100])
    expect(result.current[2]).toEqual({
      current: 3,
      pageSize: 30,
      total: 100
    })
    expect(loadDataV).toEqual({
      listAlias: [100],
      totalAlias: 100
    })
  })
})
