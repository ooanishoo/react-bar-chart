import { MULTIPLIER } from '@/constant'
import { BarChartDimenstion } from '@/types'
import styled from 'styled-components'

export const StyledBar = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  background-color: #3398dc;
  height: ${props => props.height};
  width: 64px;
  border: 1px solid black;
  border-bottom: none;
  z-index: 1000;
`

export const StyledBarButton = styled.button`
  height: 12px;
  width: 6px;
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  top: -6px;
  position: relative;
`

export const StyledCanvas = styled.div<BarChartDimenstion>`
  display: flex;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  align-items: flex-end;
  justify-content: space-evenly;
  gap: 8px;
  background-color: white;
  position: relative;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`

export const StyledForm = styled.form`
  display: flex;
`

export const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  outline: none;
  width: 100%;
  // add disabled style
  &:disabled {
    background-color: #fff;
    cursor: not-allowed;
  }
`

export const StyledButton = styled.button`
  padding: 12px;
  color: #fff;
  background: #3398dc;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2282c1;
  }
  border-left: none;
  &:disabled {
    cursor: not-allowed;
  }
`

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const calcWidth = (count: number) => {
  if (count % 5 === 0) {
    return 'calc(100% + 10px)' // display horizontal grid lines on every 5th line
  } else {
    return '10px'
  }
}

export const StyledGridLines = styled.div<{ count: number }>`
  width: ${({ count }) => calcWidth(count)};
  height: 1px;
  background-color: slategray;
  position: absolute;
  left: -10px;
  bottom: ${({ count }) => `${count * MULTIPLIER}px`};
  &:before {
    content: ${({ count }) => (count % 5 === 0 ? `"${count}"` : '')};
    position: relative;
    top: -10px;
    right: 20px;
  }
`
