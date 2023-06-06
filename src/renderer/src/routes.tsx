import React from 'react'
import { Game, GameOver, Home } from './pages'

export interface IRoute {
  path: RouteNames
  element: React.ReactElement
}

export enum RouteNames {
  HOME = '/',
  GAME = '/game',
  GAME_OVER = '/gameOver'
}

export const AppRoutes: IRoute[] = [
  { path: RouteNames.HOME, element: <Home /> },
  { path: RouteNames.GAME, element: <Game /> },
  { path: RouteNames.GAME_OVER, element: <GameOver /> }
]
