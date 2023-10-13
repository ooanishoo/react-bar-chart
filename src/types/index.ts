export interface BarChartData {
  id: number
  frequency: number
}

export interface BarChartDimenstion {
  width: number
  height: number
}

export interface BarChartContext {
  data: BarChartData[]
  maxYaxis: number
  dimension: BarChartDimenstion
  isBarChartReadyOnly: boolean
  setData: (data: BarChartData[]) => void
  setMaxYaxis: (maxYaxis: number) => void
  setIsBarChartReadyOnly: (isBarChartReadyOnly: boolean) => void
}
