import { BarChartStateProvider } from '@/context/BarChartStateProvider'
import BarChart from '@/components/BarChart'
import { BarChartData, BarChartDimenstion } from '@/types'
import { ReactElement } from 'react'

interface BarChartContainerProps {
  data?: BarChartData[]
  dimension?: BarChartDimenstion
}

const BarChartContainer = (props: BarChartContainerProps): ReactElement => {
  return (
    <BarChartStateProvider {...props}>
      <h1>Bar chart</h1>
      <BarChart />
    </BarChartStateProvider>
  )
}

export default BarChartContainer
