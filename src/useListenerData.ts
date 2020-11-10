/**
 * useListenerData(监听指定数据变化)
 */

import { useEffect } from 'react'

export default function useListenerData(target: any[], handler: () => void) {
  useEffect(handler, target)
}
