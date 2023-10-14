import { ReactElement } from 'react'
import styled from 'styled-components'
import BarChartContainer from '@/components/BarChartContainer'
import { mockData1, mockData2 } from '@/data'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const App = (): ReactElement => {
  return (
    <StyledWrapper>
      <BarChartContainer />
      <BarChartContainer data={mockData1} />
      <BarChartContainer
        data={mockData2}
        dimension={{
          width: 200,
          height: 500
        }}
      />
    </StyledWrapper>
  )
}

export default App
