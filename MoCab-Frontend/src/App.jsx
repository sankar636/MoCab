import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Start from './Pages/Start.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import CaptainSignUp from './Pages/CaptainSignUp.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignUp from './Pages/UserSignUp.jsx'
import Home from './Pages/Home.jsx'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='CaptainLogin' element={<CaptainLogin/>}></Route>
        <Route path='CaptainSignUp' element={<CaptainSignUp/>}></Route>
        <Route path='UserLogin' element={<UserLogin/>}></Route>
        <Route path='UserSignUp' element={<UserSignUp/>}></Route>
        <Route path='home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
