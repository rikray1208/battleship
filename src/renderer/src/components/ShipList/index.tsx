import React from 'react'
import classes from './ShipList.module.css'
import { MShip } from '../../Models/Ship'
import { Button, Reload, SwitchButton } from '../ui-kit'
import { Direction } from '../../types'
import { useGameStore } from '../../store'

interface ShipsProps {
  ships: MShip[]
  onSelect: (ship: MShip) => void
  selected: MShip | null
  onReload: () => void
}
const ShipList: React.FC<ShipsProps> = ({ ships, onSelect, selected, onReload }) => {
  const { setMode, playerBoard, updatePlayerBoard } = useGameStore()
  const notPlacementShips = ships.filter((ship) => ship.state == null)

  const onSwitch = (value: string) => {
    notPlacementShips.forEach((ship) => ship.setDirection(value as Direction))
  }

  const onStartGame = () => {
    setMode('game')
  }

  const onRandom = () => {
    playerBoard?.setRandomShips()
    updatePlayerBoard()
  }

  return (
    <div className={classes.container}>
      <div className={classes.btns}>
        <SwitchButton onSwitch={onSwitch} value1={'X'} value2={'Y'} />
        <Reload onClick={onReload} />
        <Button onClick={onRandom}>random</Button>
      </div>
      {notPlacementShips.length > 0 ? (
        <>
          <ul className={classes.list}>
            {notPlacementShips.reverse().map((ship, index) => (
              <li
                key={ship.type + '' + index}
                className={`${classes.ship} ${selected?.id == ship.id ? classes.selected : ''}`}
                onClick={() => onSelect(ship)}
              >
                {[...Array(ship.type).keys()].map((el) => (
                  <div key={el} className={classes.shipCell}></div>
                ))}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div style={{ margin: 'auto 0' }}>
          <Button onClick={onStartGame}>Start game</Button>
        </div>
      )}
    </div>
  )
}

export default ShipList
