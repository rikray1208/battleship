import React from 'react'
import { Button } from '../../components/ui-kit'
import { useNavigate } from 'react-router-dom'
import classes from './Home.module.css'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const onClickHandler = () => {
    navigate('/game')
  }

  return (
    <div className={classes.container}>
      <Button onClick={onClickHandler}>Начать расстановку кораблей</Button>
    </div>
  )
}

export default Home
