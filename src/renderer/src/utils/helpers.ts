import { Direction, Order } from '../types'

export const getRandomDirection = (): Direction => {
  const values: Direction[] = ['X', 'Y']
  return values[Math.floor(Math.random() * 2)]
}

export const getRandomOrder = (): Order => {
  const values: Order[] = ['+', '-']
  return values[Math.floor(Math.random() * 2)]
}
