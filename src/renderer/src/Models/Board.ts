import { MCell } from './Cell'
import { MShip } from './Ship'
import { getRandomDirection } from '../utils/helpers'
import { CellsDisplay } from '../types'

export class MBoard {
  cells: MCell[][] = []
  ships: MShip[] = []
  cellsDisplay: CellsDisplay = 'open'

  public boardInit() {
    const cells: MCell[][] = []
    const ships: MShip[] = []

    for (let i = 0; i < 10; i++) {
      const row: MCell[] = []
      for (let j = 0; j < 10; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new MCell(j, i, null, this))
        } else {
          row.push(new MCell(j, i, null, this))
        }
      }
      cells.push(row)
    }

    this.cells = cells

    for (let i = 0; i < 4; i++) {
      ships.push(new MShip(1, 'X'))
    }

    for (let i = 0; i < 3; i++) {
      ships.push(new MShip(2, 'X'))
    }

    for (let i = 0; i < 2; i++) {
      ships.push(new MShip(3, 'X'))
    }

    for (let i = 0; i < 1; i++) {
      ships.push(new MShip(4, 'X'))
    }

    this.ships = ships
  }

  public isShipsDestroyed() {
    const killed: MShip[] = []

    this.ships.forEach((ship) => {
      if (ship.state == 'killed') killed.push(ship)
    })

    return killed.length == 10
  }

  public getCell(i: number, j: number): MCell {
    return this.cells[j][i] || null
  }

  public getRandomCell() {
    return this.getCell(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
  }

  public getCopy(): MBoard {
    const newBoard = new MBoard()

    newBoard.cells = this.cells
    newBoard.ships = this.ships
    newBoard.cellsDisplay = this.cellsDisplay

    return newBoard
  }

  public setDisplay(display: CellsDisplay) {
    this.cellsDisplay = display
  }

  public getCellsByShipDirection(cell: MCell, ship: MShip): MCell[] {
    const cells: MCell[] = []

    for (let i = 0; i < ship.type; i++) {
      const currentCell =
        ship.direction == 'X'
          ? this.getCell(cell.x + i, cell.y)
          : this.getCell(cell.x, cell.y + i < 10 ? cell.y + i : 9)
      if (currentCell) {
        cells.push(currentCell)
      }
    }
    return cells
  }

  public getCellsByShip(ship: MShip): MCell[] {
    const cells: MCell[] = []

    this.cells.forEach((row) =>
      row.forEach((cell) => {
        if (cell?.ship?.id == ship.id) {
          cells.push(cell)
        }
      })
    )

    return cells
  }

  public getDiagonalCells(cell: MCell) {
    const cells: MCell[] = []

    if (cell.x > 0 && cell.y > 0) {
      cells.push(this.getCell(cell.x - 1, cell.y - 1))
    }

    if (cell.x < 10 - 1 && cell.y > 0) {
      cells.push(this.getCell(cell.x + 1, cell.y - 1))
    }

    if (cell.x > 0 && cell.y < 10 - 1) {
      cells.push(this.getCell(cell.x - 1, cell.y + 1))
    }

    if (cell.x < 10 - 1 && cell.y < 10 - 1) {
      cells.push(this.getCell(cell.x + 1, cell.y + 1))
    }

    return cells
  }

  public getXNeighbors(cell: MCell) {
    const cells: MCell[] = []

    if (cell.x + 1 <= 10 - 1) {
      cells.push(this.getCell(cell.x + 1, cell.y))
    }
    if (cell.x - 1 >= 0) {
      cells.push(this.getCell(cell.x - 1, cell.y))
    }

    return cells
  }

  public getYNeighbors(cell: MCell) {
    const cells: MCell[] = []

    if (cell.y + 1 <= 10 - 1) {
      cells.push(this.getCell(cell.x, cell.y + 1))
    }
    if (cell.y - 1 >= 0) {
      cells.push(this.getCell(cell.x, cell.y - 1))
    }

    return cells
  }

  public getCellsAround(cell) {
    let cells: MCell[] = []

    cells = [...cells, ...this.getDiagonalCells(cell)]
    cells = [...cells, ...this.getXNeighbors(cell)]
    cells = [...cells, ...this.getYNeighbors(cell)]

    return cells
  }

  public canSetShip(ship: MShip, cell: MCell) {
    if (cell.isHaveShip()) return false
    if (!cell.checkBorders(ship)) return false

    const cells = this.getCellsByShipDirection(cell, ship)
    const cellsAround: MCell[] = []

    cells.forEach((cell) => {
      const cells = this.getCellsAround(cell)
      cellsAround.push(...cells)
    })

    return cellsAround.filter((cell) => cell.isHaveShip()).length == 0
  }

  public setShip(ship: MShip, cell: MCell) {
    const cells = this.getCellsByShipDirection(cell, ship)

    cells.forEach((cell) => {
      cell.setShip(ship)
      ship.setState('onBoard')
      ship.pushCell(cell)
    })
  }

  public setRandomShips() {
    this.boardInit()

    this.ships.forEach((ship) => {
      const setRandomShip = () => {
        const cell = this.getRandomCell()
        ship.setDirection(getRandomDirection())

        if (this.canSetShip(ship, cell)) {
          this.setShip(ship, cell)
        } else {
          setRandomShip()
        }
      }

      setRandomShip()
    })
  }
}
