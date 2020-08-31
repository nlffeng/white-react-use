/**
 * useClosureCallback(持久化 function 并和参数形成闭包)
 */

import { useRef, useCallback } from 'react'

// export default function useClosureCallback(callback: Function): Function {
//   const callbackRef = useRef<Function>()
//   const prevParams = useRef<Array<any>>([])

//   callbackRef.current = callback

//   const substituteCb = useCallback((...args) => {
//     (callbackRef.current!)(...prevParams.current, ...args)
//   }, [])

//   const wrapCallback = useCallback((...args) => {
//     prevParams.current = args || []

//     return substituteCb
//   }, [])

//   return wrapCallback
// }

export default function otherMethod() {
  const callbackRef = useRef<Function>(() => {})

  const substituteCb = useCallback((...args: any[]) => {
    callbackRef.current(...args)
  }, [])

  const wrapCallback = (fn: Function) => {
    callbackRef.current = fn

    return substituteCb
  }

  return wrapCallback
}
