/**
 * useChangedState(生成可变的状态)
 */

import { useState, useRef, MutableRefObject } from 'react'
import useListenerData from './useListenerData'
import useFirstMountState from './useFirstMountState'

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

export default function useChangedState(listenFactors?: ListenFactor | ListenFactors) {
  const remountFactors = dealRemountFactors(listenFactors)
  const remountFactorRef = useRef<RemountFactorRef>(remountFactors)
  remountFactorRef.current.listenFactors = remountFactors.listenFactors

  const changedState = useKey(remountFactorRef)

  return changedState
}

export function useKey(remountFactorRef: MutableRefObject<RemountFactorRef>) {
  const [key, setKey] = useState<number>(0)
  const isFirstMount = useFirstMountState()
  const { count, listenFactors: factors } = remountFactorRef.current

  for (let i = 0; i < count; i += 1) {
    const factor = factors[i] || {}
    const { listenFactor, listenFactors, isRemountFn } = factor

    useListenerData(listenFactors || [listenFactor], () => {
      const isRemount = isRemountFn ? isRemountFn(listenFactors || listenFactor) : true

      if (!isFirstMount && isRemount) {
        setKey(key === 10000 ? 0 : key + 1)
      }
    })
  }

  return key
}

export function dealRemountFactors(listenFactors?: ListenFactor | ListenFactors) {
  let count = 0

  if (listenFactors) {
    if (!Array.isArray(listenFactors)) {
      listenFactors = [listenFactors]
    }
    count = listenFactors.length
  }

  return {
    count,
    listenFactors: listenFactors || []
  }
}
