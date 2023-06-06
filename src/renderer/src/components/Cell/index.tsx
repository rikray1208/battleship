import React, { useEffect, useState } from 'react'
import classes from './Cell.module.css'
import { MCell } from '../../Models/Cell'
import { CellsDisplay } from '../../types'
import { Letters } from '../../utils/constants'

interface CellProps {
  cell: MCell
  display: CellsDisplay
  onClick?: (cell: MCell) => void
  onCellEnter?: (cell: MCell) => void
  onCellOut?: (cell: MCell) => void
}

const Cell: React.FC<CellProps> = (props) => {
  const { cell, onClick, onCellEnter, onCellOut, display } = props
  const [animation, setAnimation] = useState(false)

  if (animation) setTimeout(() => setAnimation(false), 500)

  const onClickHandler = (cell: MCell) => {
    onClick && onClick(cell)
  }

  useEffect(() => {
    setAnimation(true)
  }, [cell.isAttacked])

  return (
    <>
      {display == 'open' ? (
        <div
          onClick={() => onClickHandler(cell)}
          onMouseEnter={() => onCellEnter && onCellEnter(cell)}
          onMouseOut={() => onCellOut && onCellOut(cell)}
          className={`
            ${classes.cell}

            ${cell.ship ? classes.ship : ''}
            ${cell.isAvailable == true ? classes.available : ''}
            ${cell.isAvailable == false ? classes.notAvailable : ''}
          `}
        >
          {cell.y == 0 && <div className={classes.coordinateX}>{Letters[cell.x]}</div>}
          {cell.x == 0 && <div className={classes.coordinateY}>{cell.y}</div>}

          {cell.isHaveShip() && cell.isAttacked && (
            <div className={`${classes.cellItem} ${classes.ship}`}>
              {(cell?.ship?.state == 'killed' || cell?.ship?.state == 'attacked') && <span>X</span>}
            </div>
          )}
          {cell.isAttacked && !cell.isHaveShip() && (
            <span className={`${classes.dot} ${animation ? classes.animation : ''}`}>.</span>
          )}
        </div>
      ) : (
        <div onClick={() => onClickHandler(cell)} className={`${classes.cell}`}>
          {cell.y == 0 && <div className={classes.coordinateX}>{Letters[cell.x]}</div>}
          {cell.x == 0 && <div className={classes.coordinateY}>{cell.y}</div>}
          {cell.isHaveShip() && cell.isAttacked && (
            <div className={`${classes.cellItem} ${classes.ship}`}>
              {cell?.ship?.state == 'killed' && 'X'}
            </div>
          )}
          {cell.isAttacked && !cell.isHaveShip() && (
            <span className={`${classes.dot} ${animation ? classes.animation : ''}`}>.</span>
          )}
        </div>
      )}
    </>
  )
}

export default Cell
