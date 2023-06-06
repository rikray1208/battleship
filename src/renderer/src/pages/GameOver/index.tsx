import React, { useEffect } from 'react'
import { useGameStore } from '../../store'
import clasess from './GameOver.module.css'
import { Button } from '../../components/ui-kit'
import { useNavigate } from 'react-router-dom'

const GameOver: React.FC = () => {
  const { winner, moveCounter, clearStore } = useGameStore()
  const navigate = useNavigate()

  const onStart = () => {
    clearStore()
    navigate('/game')
  }

  useEffect(() => {
    window.api.generateLog(`${winner} won, ходов: ${moveCounter}`)
  }, [])

  return (
    <div className={clasess.container}>
      <h1>Game over</h1>
      <h3>{winner} won</h3>

      <Button onClick={onStart}>Start new game</Button>
    </div>
  )
}

export default GameOver
