import { MCell } from './Cell'
import { Direction, ShipState } from '../types'

export class MShip {
  id: number
  type: number
  direction: Direction
  state: ShipState | null
  cells: MCell[]

  constructor(type: number, direction: Direction) {
    this.id = Math.random()
    this.direction = direction
    this.type = type
    this.cells = []
    this.state = null
  }

  public pushCell(cell: MCell) {
    this.cells = [...this.cells, cell]
  }

  public setState(state: ShipState) {
    this.state = state
  }

  public setDirection(direction: Direction) {
    this.direction = direction
  }
}
