/**
 * useRemountComponent(再次挂载指定组件)
 */

import React, { ComponentType, FunctionComponent, useRef, useMemo } from 'react'
import useChangedState, { dealRemountFactors, useKey } from './useChangedState'

interface ListenFactor {
  listenFactor?: any
  listenFactors?: Array<any>
  isRemountFn?: (factor: any) => boolean
}
type ListenFactors = Array<ListenFactor>

interface RemountFactorRef {
  count: number
  listenFactors: ListenFactors
}

interface Props {
  [propName: string]: any
}

export default function useRemountComponent(Component: ComponentType, listenFactors?: ListenFactor | ListenFactors) {
  const remountFactors = dealRemountFactors(listenFactors)
  const remountFactorRef = useRef<RemountFactorRef>(remountFactors)
  remountFactorRef.current.listenFactors = remountFactors.listenFactors

  const WrapComponent = useMemo<FunctionComponent<Props>>(() => props => {
    const remountKey = useKey(remountFactorRef)

    return <Component key={remountKey} {...props} />
  }, [])

  if (remountFactorRef.current.count === 0) return Component

  return WrapComponent
}

export const useRemountKey = useChangedState
