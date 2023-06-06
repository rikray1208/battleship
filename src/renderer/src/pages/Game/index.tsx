import React, { useEffect, useState } from 'react'
import ShipsPlacement from '../../components/ShipsPlacement'
import { useGameStore } from '../../store'
import { MBoard } from '../../Models/Board'
import Board from '../../components/Borad'
import classes from './Game.module.css'
import { MCell } from '../../Models/Cell'
import { Bot } from '../../Models/Bot'
import { useNavigate } from 'react-router-dom'

const Game: React.FC = () => {
  const {
    botBoard,
    playerBoard,
    turn,
    mode,
    moveCounter,
    incrementCounter,
    setWinner,
    setTurn,
    updateBotBoard,
    updatePlayerBoard,
    setBotBoard
  } = useGameStore()
  const [bot, setBot] = useState<null | Bot>(null)
  const botAttack = async () => {
    if (bot) {
      await bot.attack()

      const newBot = bot.cloneBot()
      setBot(newBot)
      setTurn('player')
    }
  }

  const navigate = useNavigate()

  const onAttack = (cell: MCell) => {
    if (!cell.isAttacked && turn == 'player') {
      const target = cell.attack()
      updateBotBoard()

      if (target == 'miss') {
        setTurn('bot')
      }

      incrementCounter()
    }
  }

  useEffect(() => {
    const botBoard = new MBoard()
    botBoard.boardInit()
    botBoard.setDisplay('close')
    botBoard.setRandomShips()
    setBotBoard(botBoard)
  }, [])

  useEffect(() => {
    if (turn == 'bot') {
      botAttack()
    }
  }, [turn])

  useEffect(() => {
    const bot = new Bot(playerBoard as MBoard, updatePlayerBoard)
    setBot(bot)
  }, [playerBoard])

  useEffect(() => {
    if (botBoard?.isShipsDestroyed() || playerBoard?.isShipsDestroyed()) {
      if (botBoard?.isShipsDestroyed()) setWinner('player')
      if (playerBoard?.isShipsDestroyed()) setWinner('bot')

      navigate('/gameOver')
    }
  }, [botBoard, playerBoard])

  return (
    <>
      {mode == 'placement' ? (
        <ShipsPlacement />
      ) : (
        <div className={classes.container}>
          <div className={classes.infoContainer}>
            <div className={classes.turn}>Ход: {turn}</div>
            <div className={classes.counter}>Номер Хода: {moveCounter}</div>
          </div>
          {playerBoard && <Board board={playerBoard} />}
          {botBoard && <Board onCellClick={onAttack} board={botBoard} />}
        </div>
      )}
    </>
  )
}

export default Game
