import { Bar } from '@/components/Bar'
import {
  StyledButton,
  StyledCanvas,
  StyledDiv,
  StyledForm,
  StyledGridLines,
  StyledInput,
  StyledWrapper
} from '@/components/styles'
import { MULTIPLIER } from '@/constant'
import { useBarChart } from '@/context/useBarChart'
import {
  calculateGridLines,
  convertToFrequency,
  findMaxFrequency
} from '@/utils'
import { ReactElement, useCallback, useEffect, useState } from 'react'

const BarChart = (): ReactElement => {
  const {
    data,
    setData,
    maxYaxis,
    setMaxYaxis,
    dimension,
    isBarChartReadyOnly,
    setIsBarChartReadyOnly
  } = useBarChart()

  const { width: barChartWidth, height: barChartHeight } = dimension
  const [minYaxis, setMinYaxis] = useState<number>(maxYaxis)

  useEffect(() => {
    setMinYaxis(findMaxFrequency(data))
  }, [minYaxis, data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMaxYaxis(e.currentTarget.maxYaxis.value)
    e.currentTarget.reset()
    e.currentTarget.maxYaxis.focus()
  }

  const handleOnBarResize = useCallback(
    (barId: number, columnHeight: number) => {
      setData(
        data.map(item => {
          if (item.id === barId) {
            return {
              ...item,
              frequency: columnHeight
            }
          }
          return item
        })
      )
    },
    [data, setData]
  )

  const toggleBarChartReadyOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBarChartReadyOnly(e.target.checked)
  }

  const grideLines = calculateGridLines(barChartHeight, MULTIPLIER)

  const renderGridLines = Array(grideLines)
    .fill('')
    .map((_, index) => (
      <StyledGridLines key={index} count={index + 1}></StyledGridLines>
    ))

  const renderBars = data.map(item => (
    <Bar
      key={item.id}
      frequency={item.frequency}
      onResize={(columnHeight: number) => {
        handleOnBarResize(item.id, columnHeight)
      }}
    />
  ))

  return (
    <StyledWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="number"
          id="maxYaxis"
          placeholder="Enter new y-axis maximum value"
          min={minYaxis}
          max={convertToFrequency(barChartHeight)}
          disabled={isBarChartReadyOnly}
        />
        <StyledButton type="submit" disabled={isBarChartReadyOnly}>
          Submit
        </StyledButton>
      </StyledForm>
      <StyledDiv>
        <span>
          Y-Axis Maximum: <b>{maxYaxis}</b>
        </span>
        <div>
          <input
            type="checkbox"
            title='Toggle "Ready only" mode'
            id="isReadyOnly"
            checked={isBarChartReadyOnly}
            onChange={toggleBarChartReadyOnly}
          />
          <label htmlFor="isReadyOnly">Ready only</label>
        </div>
      </StyledDiv>
      <StyledCanvas width={barChartWidth} height={barChartHeight}>
        {renderGridLines}
        {renderBars}
      </StyledCanvas>
    </StyledWrapper>
  )
}

export default BarChart
