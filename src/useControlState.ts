/**
 * useControlState(设定受控状态)
 */

import { useState } from 'react'

type InitialValue<Value> = Value extends Record<any, any>
  ? { [K in keyof Value]?: Value[K] }
  : Value

interface Params<Value> {
  isControl?: boolean
  value?: Value
  onChange?: (v: Value | undefined) => void
  initialValue?: InitialValue<Value>
}

export default function useControlState<Value>(
  params?: Params<Value>
): [Value | InitialValue<Value> | undefined, (v: Value | undefined) => void] {
  const { isControl, value, onChange, initialValue } = params || {}
  const [innerValue, setInnerValue] = useState<Value | InitialValue<Value> | undefined>(
    initialValue
  )
  const _value = isControl ? value : innerValue

  // 受控或非受控设置数据
  const setData = (newValue: Value | undefined): void => {
    if (!isControl) {
      setInnerValue(newValue)
    }

    if (onChange) {
      onChange(newValue)
    }
  }

  return [_value, setData]
}
