/**
 * useListData(list and pagination data)
 */

import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export type Mode = 'add' | 'update'

export type LoadApi = (params: LoadDataParams) => Promise<any>

export interface Options {
  currentAlias?: string
  totalAlias?: string
  pageSizeAlias?: string
  listAlias?: string
  current?: number
  pageSize?: number
  total?: number
  mode?: Mode
}

export interface Pagination {
  current: number
  pageSize: number
  total: number
}

export interface LoadDataParams {
  [propName: string]: any
}

export type LoadDataFn = (params?: LoadDataParams) => Promise<any>

export type UseListDataRet = [
  LoadDataFn,
  Array<any>,
  Dispatch<SetStateAction<Array<any>>>,
  Pagination,
  Dispatch<SetStateAction<Pagination>>
]

export default function useListData(loadApi: LoadApi, options: Options = {}): UseListDataRet {
  const {
    currentAlias = 'pageNum',
    totalAlias = 'total',
    pageSizeAlias = 'pageSize',
    listAlias = 'list',
    current = 1,
    pageSize = 10,
    total = 0,
    mode = 'update'
  } = options
  const [list, setList] = useState<Array<any>>([])
  const [pagination, setPagination] = useState<Pagination>({
    current,
    pageSize,
    total
  })

  const loadData = useCallback<LoadDataFn>(
    async (params = {}) => {
      try {
        const data = (await loadApi(params)) || {}
        let newList = data[listAlias] || []

        if (mode === 'add') {
          newList = ([] as Array<any>).concat(list, data[listAlias] || [])
        }

        setList(newList)
        setPagination({
          current: params[currentAlias],
          pageSize: params[pageSizeAlias] || pageSize,
          total: data[totalAlias] || 0
        })

        return data
      } catch (e) {
        return Promise.reject(e)
      }
    },
    [loadApi, listAlias, mode, list, currentAlias, pageSizeAlias, pageSize, totalAlias]
  )

  return [loadData, list, setList, pagination, setPagination]
}
