import { ReactElement, useEffect, useRef } from 'react'
import { MULTIPLIER } from '@/constant'
import { useBarChart } from '@/context/useBarChart'
import { StyledBar, StyledBarButton } from '@/components/styles'
import { convertToFrequency } from '@/utils'

interface IBarProps {
  frequency: number
  onResize?: (columnHeight: number) => void
}

export const Bar = ({ frequency, onResize }: IBarProps): ReactElement => {
  const barRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const { maxYaxis, dimension, isBarChartReadyOnly } = useBarChart()
  const { height: barChartHeight } = dimension

  const maxFrequency = maxYaxis * MULTIPLIER

  useEffect(() => {
    if (isBarChartReadyOnly) return

    const barElement = barRef.current as HTMLDivElement
    const styles = window.getComputedStyle(barElement)

    let height = parseInt(styles.height, 10)
    let yCord = 0

    const handleMouseMove = (e: MouseEvent) => {
      const currentYCord = e.clientY

      const deltaY = yCord - currentYCord
      height = height + deltaY

      yCord = e.clientY

      if (height > barChartHeight) height = barChartHeight

      if (height > maxFrequency) height = maxFrequency

      barElement.style.height = `${height}px`
    }

    const handleMouseUp = () => {
      // if height is not multiple of MULTIPLER then round it to nearest multiple of MULTIPLER
      if (height % MULTIPLIER !== 0) {
        height = Math.round(height / MULTIPLIER) * MULTIPLIER
        barElement.style.height = `${height}px`
      }

      document.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mousedown', handleMouseDown)

      // return the height in terms of frequency
      onResize && onResize(convertToFrequency(height))
    }

    const handleMouseDown = (e: MouseEvent) => {
      yCord = e.clientY
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    // add mouse click event listener to button
    const btn = btnRef.current as HTMLButtonElement
    btn.addEventListener('mousedown', handleMouseDown)

    // remove mouse click event listener to button
    return () => {
      btn.removeEventListener('mousedown', handleMouseDown)
    }
  }, [barChartHeight, isBarChartReadyOnly, maxFrequency, onResize])

  const barHeight = frequency < 0 ? `0px` : `${frequency * MULTIPLIER}px`

  return (
    <StyledBar ref={barRef} height={barHeight}>
      {!isBarChartReadyOnly ? (
        <StyledBarButton
          ref={btnRef}
          title={'Drag the column to change the frequency'}
        />
      ) : null}
    </StyledBar>
  )
}
