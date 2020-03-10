/**
 * useHashQuery(获取地址栏哈希后的查询参数)
 */

import { useMemo, DependencyList } from 'react'
import { resolveQuery } from './util'

export interface UseHashQueryRet {
  [propName: string]: any
}

export default function useHashQuery(deps: DependencyList | undefined = []): UseHashQueryRet {
  const hashQuery = useMemo<UseHashQueryRet>(() => {
    const hash = window.location.hash
    const i = hash.indexOf('?')

    if (i === -1) {
      return {}
    }

    const str = hash.substring(i + 1)
    const query = resolveQuery(str)

    return query
  }, deps)

  return hashQuery
}
