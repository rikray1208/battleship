import { MBoard } from './Board'
import { MCell } from './Cell'
import { getRandomDirection } from '../utils/helpers'
import { Direction } from '../types'

export class Bot {
  board: MBoard
  boardUpdater: () => void
  cacheCell: MCell | null = null
  lastCell: MCell | null = null
  cacheDir: Direction | null = null

  constructor(board: MBoard, boardUpdater) {
    this.board = board
    this.boardUpdater = boardUpdater
  }

  public cloneBot() {
    const newBot = new Bot(this.board as MBoard, this.boardUpdater)
    newBot.cacheCell = this.cacheCell
    newBot.cacheDir = this.cacheDir
    newBot.lastCell = this.lastCell
    return newBot
  }

  public clearCache() {
    this.cacheCell = null
    this.cacheDir = null
    this.lastCell = null
  }

  public changeDir() {
    this.cacheDir = this.cacheDir == 'X' ? 'Y' : 'X'
  }

  public getCellsByDir(): MCell[] {
    if (this.cacheCell) {
      const currentCell = this.lastCell || this.cacheCell
      const direction = this.cacheDir || getRandomDirection()

      const XCells = this.board
        .getXNeighbors(currentCell)
        .filter((cell) => cell.isAttacked == false)
      const YCells = this.board
        .getYNeighbors(currentCell)
        .filter((cell) => cell.isAttacked == false)

      if (XCells.length == 0 && YCells.length == 0 && currentCell == this.lastCell) {
        this.lastCell = null
        this.getCellsByDir()
      }

      if (XCells.length == 0 && YCells.length == 0 && currentCell == this.cacheCell) {
        throw new Error('no active cells')
      }

      if (direction == 'X') {
        return XCells
      } else {
        return YCells
      }
    }
    return []
  }

  public async attackOnShip() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const cells = this.getCellsByDir()

      if (cells.length == 0) {
        this.changeDir()
        await this.attackOnShip()
      }

      if (cells.length > 0) {
        const cellAttack = cells[0]

        const target = cellAttack.attack()

        if (target == 'miss') {
          this.lastCell = null
        }

        if (target == 'damaged') {
          this.lastCell = cellAttack
          this.boardUpdater()
          await this.attackOnShip()
        }

        if (target == 'killed') {
          this.clearCache()
          this.boardUpdater()
          await this.attack()
        }
      }
    } catch (e) {
      this.clearCache()
    }
  }

  public async attack() {
    if (this.cacheCell) {
      await this.attackOnShip()
    } else {
      const cell = this.board.getRandomCell()

      if (cell.isAttacked) {
        await this.attack()
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const target = cell.attack()

        if (target == 'damaged') {
          this.cacheCell = cell
          this.boardUpdater()
          await this.attackOnShip()
        }

        if (target == 'killed') {
          this.clearCache()
          this.boardUpdater()
          await this.attack()
        }
      }
    }
  }
}
