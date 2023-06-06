import React, { useState } from 'react'
import classes from './SwitchButton.module.css'

interface SwitchButtonProps {
  value1: string
  value2: string
  onSwitch?: (value: string) => void
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ value1, value2, onSwitch }) => {
  const [selected, setSelected] = useState<string>(value1)

  const onClick = (value: string) => {
    onSwitch && onSwitch(value)
    setSelected(value)
  }

  return (
    <ul className={classes.container}>
      <li
        onClick={() => onClick(value1)}
        className={`${classes.item} ${selected == value1 ? classes.selected : ''}`}
      >
        {value1}
      </li>
      <li
        onClick={() => onClick(value2)}
        className={`${classes.item} ${selected == value2 ? classes.selected : ''}`}
      >
        {value2}
      </li>
    </ul>
  )
}

export default SwitchButton
