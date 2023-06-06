import React, { Fragment } from 'react'
import classes from './Borad.module.css'
import Cell from '../Cell'
import { MCell } from '../../Models/Cell'
import { MBoard } from '../../Models/Board'

interface BoardProps {
  board: MBoard
  onCellEnter?: (cell: MCell) => void
  onCellOut?: (cell: MCell) => void
  onCellClick?: (cell: MCell) => void
}
const Board: React.FC<BoardProps> = ({ board, onCellEnter, onCellOut, onCellClick }) => {
  return (
    <div className={classes.board}>
      {board.cells.map((row) => (
        <Fragment key={row[0].y}>
          {row.map((cell) => (
            <Cell
              key={cell.x}
              display={board.cellsDisplay}
              onCellEnter={onCellEnter}
              onCellOut={onCellOut}
              onClick={onCellClick}
              cell={cell}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

export default Board
