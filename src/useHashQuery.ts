/**
 * useHashQuery(获取地址栏哈希后的查询参数)
 */

import { useMemo, DependencyList } from 'react'
import queryString from 'query-string'

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

    const string = hash.substr(i)
    const query = queryString.parse(string)

    return query
  }, deps)

  return hashQuery
}
