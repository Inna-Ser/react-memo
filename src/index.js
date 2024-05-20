/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { LifeProvider } from './context/GamesProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <LifeProvider>
      <RouterProvider router={router} />{' '}
    </LifeProvider>{' '}
  </React.StrictMode>,
)
