import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import CaptainSignUp from './Pages/CaptainSignUp.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignUp from './Pages/UserSignUp.jsx'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='CaptainLogin' element={<CaptainLogin/>}></Route>
        <Route path='CaptainSignUp' element={<CaptainSignUp/>}></Route>
        <Route path='UserLogin' element={<UserLogin/>}></Route>
        <Route path='UserSignUp' element={<UserSignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
