import { BarChartData } from '@/types'
import {
  findMaxFrequency,
  convertToFrequency,
  calculateGridLines
} from './index'
import { describe, expect, it } from 'vitest'

describe('findMaxFrequency()', () => {
  it('should return 0 when data is empty', () => {
    const data: BarChartData[] = []
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(0)
  })

  it('should return the max frequency when data has one item', () => {
    const data: BarChartData[] = [{ id: 1, frequency: 5 }]
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(5)
  })

  it('should return the max frequency when data has multiple items', () => {
    const data: BarChartData[] = [
      { id: 1, frequency: 5 },
      { id: 2, frequency: 10 },
      { id: 3, frequency: 2 },
      { id: 4, frequency: 7 }
    ]
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(10)
  })

  it('should return 0 when data has all negative frequencies', () => {
    const data: BarChartData[] = [
      { id: 1, frequency: -5 },
      { id: 2, frequency: -10 },
      { id: 3, frequency: -2 },
      { id: 4, frequency: -7 }
    ]
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(0)
  })
  it('should return max frequency when data has some negative frequencies', () => {
    const data: BarChartData[] = [
      { id: 1, frequency: -5 },
      { id: 2, frequency: -10 },
      { id: 3, frequency: -2 },
      { id: 4, frequency: 7 }
    ]
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(7)
  })

  it('should return the max frequency when data has decimal frequencies', () => {
    const data: BarChartData[] = [
      { id: 1, frequency: 5.5 },
      { id: 2, frequency: 10.2 },
      { id: 3, frequency: 2.1 },
      { id: 4, frequency: 7.8 }
    ]
    const maxFrequency = findMaxFrequency(data)
    expect(maxFrequency).toEqual(10.2)
  })
})

describe('convertToFrequency()', () => {
  let height: number

  it('should return 0 when height is 0', () => {
    height = 0
    const frequency = convertToFrequency(height)
    expect(frequency).toEqual(0)
  })

  it('should return 0 when height is negative', () => {
    height = -10
    const frequency = convertToFrequency(height)
    expect(frequency).toEqual(0)
  })

  it('should return the frequency when height is a multiple of MULTIPLIER', () => {
    height = 50
    const frequency = convertToFrequency(height)
    expect(frequency).toEqual(2)
  })

  it.skip('should return the rounded frequency when height is not a multiple of MULTIPLIER', () => {
    height = 95
    const frequency = convertToFrequency(height)
    expect(frequency).toEqual(4)
  })
})
describe('calculateGridLines()', () => {
  it('should return 0 when height is 0', () => {
    const height = 0
    const multiplier = 10
    const frequency = calculateGridLines(height, multiplier)
    expect(frequency).toEqual(0)
  })

  it('should return 0 when height is negative', () => {
    const height = -10
    const multiplier = 10
    const frequency = calculateGridLines(height, multiplier)
    expect(frequency).toEqual(0)
  })

  it('should return 0 when multiplier is 0', () => {
    const height = 10
    const multiplier = 0
    const frequency = calculateGridLines(height, multiplier)
    expect(frequency).toEqual(0)
  })

  it('should return 0 when multiplier is negative', () => {
    const height = 10
    const multiplier = -10
    const frequency = calculateGridLines(height, multiplier)
    expect(frequency).toEqual(0)
  })

  it('should return the frequency when height is a multiple of multiplier', () => {
    const height = 50
    const multiplier = 10
    const frequency = calculateGridLines(height, multiplier)
    expect(frequency).toEqual(5)
  })

  describe('when height is not a multiple of multiplier', () => {
    const testCases = [
      { height: 90.1, multiplier: 10, output: 9 },
      { height: 91, multiplier: 10, output: 9 },
      { height: 94, multiplier: 10, output: 9 },
      { height: 95, multiplier: 10, output: 9 },
      { height: 96, multiplier: 10, output: 9 },
      { height: 99, multiplier: 10, output: 9 },
      { height: 99.99, multiplier: 10, output: 9 }
    ]

    testCases.forEach(({ height, multiplier, output }) => {
      it(`should return the floored frequency when height is ${height} and multiplier is ${multiplier}`, () => {
        const frequency = calculateGridLines(height, multiplier)
        expect(frequency).toEqual(output)
      })
    })
  })
})
