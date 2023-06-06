import { MShip } from './Ship'
import { MBoard } from './Board'
import { CellAttack } from '../types'

export class MCell {
  readonly x: number
  readonly y: number

  board: MBoard
  ship: MShip | null
  isAvailable: boolean | null
  isAttacked: boolean

  constructor(x: number, y: number, ship: MShip | null, board: MBoard) {
    this.x = x
    this.y = y
    this.ship = ship
    this.isAttacked = false
    this.isAvailable = null
    this.board = board
  }

  public setIsAvailable(value: boolean | null) {
    this.isAvailable = value
  }

  public setIsAttacked(value: boolean) {
    this.isAttacked = value
  }

  public isHaveShip() {
    return !!this.ship
  }

  public checkBorders(ship: MShip) {
    if (ship.direction == 'X') {
      return this.x + ship.type < 10 + 1
    }
    if (ship.direction == 'Y') {
      return this.y + ship.type < 10 + 1
    }

    return false
  }

  public setShip(ship: MShip) {
    this.ship = ship
  }

  public attack(): CellAttack {
    this.setIsAttacked(true)

    if (this.ship) {
      this.ship.setState('attacked')

      const shipCells = this.board.getCellsByShip(this.ship)

      if (shipCells.filter((cell) => cell.isAttacked).length == this.ship.type) {
        this.ship.setState('killed')

        console.log('killed ship cells', shipCells)

        shipCells.forEach((cell) => {
          const cells = this.board.getCellsAround(cell)
          console.log('cells around', cells)
          cells.forEach((cell) => cell.setIsAttacked(true))
        })

        return 'killed'
      } else {
        const cells = this.board.getDiagonalCells(this)

        cells.forEach((cell) => cell.setIsAttacked(true))

        return 'damaged'
      }
    }

    return 'miss'
  }
}
