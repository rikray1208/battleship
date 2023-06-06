import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes'

const App: React.FC = (): JSX.Element => {
  return (
    <div className="container">
      <HashRouter>
        <Routes>
          {AppRoutes.map((route) => (
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
