import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import RootLayout from './pages/RootLayout.js'
import Home from './pages/home/home.js'
import Login from './pages/login/login'


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="/login" element={<Login />} />
  </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App