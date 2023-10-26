import { ReactElement, memo } from 'react'
import { StyledGridLines } from './styles'

interface GridLinesProps {
  grideLines: number
}

const GridLinesComponent = ({ grideLines }: GridLinesProps): ReactElement => {
  const gridLines = Array(grideLines)
    .fill('')
    .map((_, index) => {
      return <StyledGridLines key={index} count={index + 1}></StyledGridLines>
    })
  return <>{gridLines}</>
}

// memo lets you skip re-rendering a component when its props are unchanged.
export const GridLines = memo(GridLinesComponent)
