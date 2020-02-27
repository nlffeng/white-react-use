/**
 * useToggleArray(数组数据，存储和移除内部的数据)
 */

import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export type Mode = 'save' | 'remove'

export type FindFn = (target: any, item: any) => boolean

export type ToggleFn = (target: any, mode?: Mode | FindFn, findFn?: FindFn) => void

export type UseToggleArrayRet<T> = [ToggleFn, Array<T>, Dispatch<SetStateAction<Array<T>>>]

export default function useToggleArray<T>(initialArr?: Array<T>): UseToggleArrayRet<T> {
  const [arr, setArr] = useState<Array<T>>(initialArr || [])

  const toggleFn = useCallback<ToggleFn>(
    (target, mode, findFn) => {
      if (typeof mode === 'function') {
        findFn = mode
        mode = undefined
      }

      const i = arr.findIndex(item =>
        typeof findFn === 'function' ? findFn(target, item) : item === target
      )
      const saveFn = () => {
        if (i !== -1) {
          return
        }
        setArr([...arr, target])
      }
      const removeFn = () => {
        if (i === -1) {
          return
        }
        const newArr = [...arr]
        newArr.splice(i, 1)
        setArr(newArr)
        return
      }

      if (mode === 'save') {
        saveFn()
      } else if (mode === 'remove') {
        removeFn()
      } else {
        saveFn()
        removeFn()
      }
    },
    [arr]
  )

  return [toggleFn, arr, setArr]
}
