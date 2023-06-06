import { create } from 'zustand'
import { MBoard } from '../Models/Board'
import { Mode, Turn } from '../types'

export interface GameState {
  playerBoard: MBoard | null
  botBoard: MBoard | null
  mode: Mode
  turn: Turn
  winner: 'player' | 'bot' | null
  moveCounter: number

  setMode: (mode: Mode) => void
  setTurn: (turn: Turn) => void
  setWinner: (winner: 'player' | 'bot' | null) => void
  incrementCounter: () => void

  setPlayerBoard: (board: MBoard) => void
  updatePlayerBoard: () => void
  resetPlayerBoard: () => void

  setBotBoard: (board: MBoard) => void
  updateBotBoard: () => void

  clearStore: () => void
}

export const useGameStore = create<GameState>((setState, getState) => ({
  playerBoard: null,
  botBoard: null,
  mode: 'placement',
  turn: 'player',
  winner: null,
  moveCounter: 0,

  setMode: (mode) => setState({ mode: mode }),
  setTurn: (turn) => setState({ turn: turn }),
  setWinner: (winner) => setState({ winner: winner }),
  incrementCounter: () => setState((state) => ({ moveCounter: state.moveCounter + 1 })),

  setPlayerBoard: (board) => setState({ playerBoard: board }),
  updatePlayerBoard: () => {
    const { playerBoard } = getState()
    const newBoard = playerBoard?.getCopy()
    setState({ playerBoard: newBoard })
  },
  resetPlayerBoard: () => {
    const board = new MBoard()
    board.boardInit()

    setState({ playerBoard: board })
  },

  setBotBoard: (board) => setState({ botBoard: board }),
  updateBotBoard: () => {
    const { botBoard } = getState()
    const newBoard = botBoard?.getCopy()
    setState({ botBoard: newBoard })
  },

  clearStore: () =>
    setState({ playerBoard: null, botBoard: null, mode: 'placement', winner: null, moveCounter: 0 })
}))
