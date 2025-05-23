import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Start from './Pages/Start.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import CaptainSignUp from './Pages/CaptainSignUp.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignUp from './Pages/UserSignUp.jsx'
import Home from './Pages/Home.jsx'
import UserProtectWrapper from './Pages/UserProtectWrapper.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import Ride from './Pages/Ride.jsx'
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper.jsx'
import CaptainHome from './Pages/CaptainHome.jsx'
import CaptainLogout from './Pages/CaptainLogout.jsx'
import CaptainRide from './Pages/CaptainRide.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='CaptainLogin' element={<CaptainLogin />}></Route>
        <Route path='CaptainSignUp' element={<CaptainSignUp />}></Route>
        <Route path='captain-ride' element={<CaptainRide />}></Route>
        <Route path='UserLogin' element={<UserLogin />}></Route>
        <Route path='UserSignUp' element={<UserSignUp />}></Route>
        <Route path='Ride' element={<Ride />}></Route>
        {/* <Route path='/user/logout' element={<UserLogout />} /> */}
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
          // <Home/>
        }>
        </Route>

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }>
        </Route>
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          // <CaptainHome/>
        }>
        </Route>
        <Route path='/driver/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

// we wrap the router inside <UserProtectWrapper> ---> it will check the token comes from the backend is right or wrong. if wrong or no token then it will directed to login page again. if token exist it will continue as chile(<Home> or <UserLogout> etc)
