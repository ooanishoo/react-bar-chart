import { BarChartContext } from '@/types'
import { BarChartStateContext } from '@/context/BarChartStateProvider'
import { useContext } from 'react'

/**
 * `useBarChart` is a custom hook that returns the context of a bar chart state within a
 * React component.
 * @returns the context object from the BarChartStateContext.
 */
export const useBarChart = (): BarChartContext => {
  const context = useContext(BarChartStateContext)
  if (context === null) {
    throw new Error('useBarChart must be used within a BarChartStateProvider')
  }
  return context
}
