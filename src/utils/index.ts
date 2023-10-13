import { MULTIPLIER } from '@/constant'
import { BarChartData } from '@/types'

/**
 * The function `findMaxFrequency` takes an array of `BarChartData` objects and returns the maximum
 * frequency value among them.
 * @param {BarChartData[]} data - An array of objects representing bar chart data. Each object should
 * have a property called "frequency" which represents the frequency value for that bar.
 * @returns the maximum frequency value from the given array of BarChartData objects.
 */
export const findMaxFrequency = (data: BarChartData[]): number => {
  return data.reduce((maxFrequency, item) => {
    return item.frequency > maxFrequency ? item.frequency : maxFrequency
  }, 0)
}

/**
 * The function `convertToFrequency` takes a height as input and returns the frequency by dividing the
 * height by a constant MULTIPLIER.
 * @param {number} height - The `height` parameter represents the height value that you want to convert
 * to a frequency.
 * @returns The function `convertToFrequency` returns a number.
 */
export const convertToFrequency = (height: number): number => {
  if (height < MULTIPLIER) return 0
  if (height % MULTIPLIER === 0) return height / MULTIPLIER

  return Math.floor(height / MULTIPLIER)
}

export const calculateGridLines = (
  height: number,
  multiplier: number
): number => {
  if (height <= 0 || multiplier <= 0) {
    return 0
  }
  return Math.floor(height / multiplier)
}
