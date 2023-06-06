import React from 'react'
import classes from './Button.module.css'
interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className={classes.button} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
