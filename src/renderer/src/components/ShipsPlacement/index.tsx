import React, { useEffect, useState } from 'react'
import { useGameStore } from '../../store'
import { MShip } from '../../Models/Ship'
import { MCell } from '../../Models/Cell'
import { MBoard } from '../../Models/Board'
import Board from '../Borad'
import ShipList from '../ShipList'
import classes from './ShipsPlacement.module.css'

const ShipsPlacement: React.FC = () => {
  const { playerBoard, updatePlayerBoard, setPlayerBoard } = useGameStore()
  const [selectedShip, setSelectedShip] = useState<MShip | null>(null)
  const [canSetShip, setCanSetShip] = useState<boolean>(false)

  const onCellEnter = (cell: MCell) => {
    if (selectedShip !== null && playerBoard) {
      const isCan = playerBoard.canSetShip(selectedShip, cell)

      const cellsByShip = playerBoard.getCellsByShipDirection(cell, selectedShip)

      cellsByShip.forEach((cell) => cell.setIsAvailable(isCan))
      setCanSetShip(isCan)
      updatePlayerBoard()
    }
  }

  const onCellOut = (cell: MCell) => {
    if (selectedShip !== null && playerBoard) {
      const cellsByShip = playerBoard.getCellsByShipDirection(cell, selectedShip)

      cellsByShip.forEach((cell) => cell.setIsAvailable(null))
      setCanSetShip(false)
      updatePlayerBoard()
    }
  }

  const onSetShip = (cell: MCell) => {
    if (selectedShip && canSetShip && playerBoard) {
      playerBoard.setShip(selectedShip, cell)

      const cellsByShip = playerBoard.getCellsByShipDirection(cell, selectedShip)

      cellsByShip.forEach((cell) => cell.setIsAvailable(null))

      setCanSetShip(false)
      setSelectedShip(null)
      updatePlayerBoard()
    }
  }

  const onSelectShip = (ship: MShip) => {
    setSelectedShip((prevState) => (prevState?.id == ship.id ? null : ship))
  }

  const createNewBoard = () => {
    const board = new MBoard()
    board.boardInit()
    setPlayerBoard(board)
  }

  useEffect(() => {
    createNewBoard()
  }, [])

  return (
    <div className={classes.container}>
      {playerBoard && (
        <div className={classes.container}>
          <Board
            onCellClick={onSetShip}
            onCellEnter={onCellEnter}
            onCellOut={onCellOut}
            board={playerBoard}
          />
          <ShipList
            ships={playerBoard.ships}
            onSelect={onSelectShip}
            selected={selectedShip}
            onReload={createNewBoard}
          />
        </div>
      )}
    </div>
  )
}

export default ShipsPlacement
