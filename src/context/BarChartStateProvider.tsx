import { GRAPH_WIDTH, GRAPH_HEIGHT, INITIAL_Y_AXIS_MAX } from '@/constant'
import { mockData } from '@/data'
import { BarChartContext, BarChartData, BarChartDimenstion } from '@/types'
import React, { PropsWithChildren, ReactElement, useState } from 'react'

export const BarChartStateContext = React.createContext<BarChartContext | null>(
  null
)

interface BarChartStateProviderProps {
  data?: BarChartData[]
  dimension?: BarChartDimenstion
}

/**
 * The `BarChartStateProvider` component is a state provider for BarChart and it's child components.
 * @param props - The data prop passed to the `BarChartStateProvider` component. It is of type
 * `PropsWithChildren<BarChartStateProviderProps>`, which means it can accept any additional props
 * along with the `children` prop.
 * @returns The `BarChartStateProvider` component is being returned.
 */
export const BarChartStateProvider = (
  props: PropsWithChildren<BarChartStateProviderProps>
): ReactElement => {
  const [data, setData] = useState(props.data ?? mockData)
  const [maxYaxis, setMaxYaxis] = useState<number>(INITIAL_Y_AXIS_MAX)
  const dimension: BarChartDimenstion = props.dimension ?? {
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT
  }

  const [isBarChartReadyOnly, setIsBarChartReadyOnly] = useState<boolean>(false)

  return (
    <BarChartStateContext.Provider
      value={{
        dimension,
        data,
        maxYaxis,
        isBarChartReadyOnly,
        setData,
        setMaxYaxis,
        setIsBarChartReadyOnly
      }}
    >
      {props.children}
    </BarChartStateContext.Provider>
  )
}
