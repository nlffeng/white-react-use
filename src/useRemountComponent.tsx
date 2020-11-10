/**
 * useRemountComponent(再次挂载指定组件)
 */

import React, { ComponentType, FunctionComponent, useState, useRef, useMemo, MutableRefObject } from 'react'
import useListenerData from './useListenerData'
import useFirstMountState from './useFirstMountState'

interface ListenFactor {
  listenFactor?: any
  listenFactors?: Array<any>
  isRemountFn: (factor: any) => boolean
}
type ListenFactors = Array<ListenFactor>

interface RemountFactorRef {
  count: number
  listenFactors: ListenFactors
}

interface Props {
  [propName: string]: any
}

export const useRemountKey = (listenFactors?: ListenFactor | ListenFactors) => {
  const remountFactors = dealRemountFactors(listenFactors)
  const remountFactorRef = useRef<RemountFactorRef>(remountFactors)
  remountFactorRef.current.listenFactors = remountFactors.listenFactors

  const remountKey = useKey(remountFactorRef)

  return remountKey
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

function useKey(remountFactorRef: MutableRefObject<RemountFactorRef>) {
  const [remountKey, setRemountKey] = useState<number>(0)
  const isFirstMount = useFirstMountState()
  const { count, listenFactors: factors } = remountFactorRef.current

  for (let i = 0; i < count; i += 1) {
    const factor = factors[i] || {}
    const { listenFactor, listenFactors, isRemountFn } = factor

    useListenerData(listenFactors || [listenFactor], () => {
      const isRemount = isRemountFn ? isRemountFn(listenFactors || listenFactor) : true

      if (!isFirstMount && isRemount) {
        setRemountKey((new Date()).getTime())
      }
    })
  }

  return remountKey
}

function dealRemountFactors(listenFactors?: ListenFactor | ListenFactors) {
  let count = 0

  if (listenFactors) {
    if (!Array.isArray(listenFactors)) {
      listenFactors = [listenFactors]
    }
    count = listenFactors.length
  }

  return {
    count,
    listenFactors: listenFactors || [],
  }
}
