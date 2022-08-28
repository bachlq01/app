import React, { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import ByPro from './views/byPro'
import Deposit from './views/deposit'
import Login from './views/login'
import Register from './views/register'
import VideoList from './views/videoList'
import Withdraw from './views/withdraw'
import mainLogo from './logo.png'
import Profile from "./views/profile";
import { useDispatch } from "react-redux";
import { setValue } from "./stores/user";

const Layout = () => {
  const [cookie, removeCookie] = useCookies(['cookie-name']);
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch()
  useEffect(() => {
    console.log(cookie.uid)
    if (!cookie.uid || cookie.uid == "undefined" && location.pathname !== "/register") {
      return navigate("/login");
    }
    getUser()
  }, [cookie.uid, location.pathname])
  const getUser =async()=>{
    try{
      const res = await fetch("https://us-central1-babu-33902.cloudfunctions.net/getUser",{
        method:"POST",
        body: JSON.stringify({uid:cookie.uid})
      }).then(res=>res.json())
      dispath(setValue(res.message))
    } catch (err){
      
    }
  }
  return (
    <>
      <nav className="main-nav" id="main-nav">
        <a className="close-menu" href="#" onClick={() => { navigate("/") }}>
          <img width={56} src={mainLogo} />
        </a>
        <a className="close-menu" href="#" onClick={() => { navigate("/") }}><i className="fa fa-home" style={{ paddingRight: 15 }}></i>Dashboard</a>
        <a className="close-menu" href="#" onClick={() => { navigate("/withdraw") }}><i className="fa fa-credit-card" style={{ paddingRight: 15 }}></i>Withdraw</a>
        <a className="close-menu" href="#" onClick={() => { navigate("/deposit") }}><i className="fa fa-credit-card" style={{ paddingRight: 15 }}></i>Deposit</a>
        <a className="close-menu" href="#" onClick={() => { navigate("/profile") }}><i className="fa fa-user" style={{ paddingRight: 15 }}></i>Profile</a>
        <a className="close-menu" href="#" onClick={() => { navigate("/bypro") }}><i className="fa fa-star" style={{ paddingRight: 15 }}></i>Plan change</a>
        <a className="close-menu" href="#" onClick={() => { removeCookie("uid"); navigate("/login") }}><i className="fa fa-sign-out" style={{ paddingRight: 15 }}></i>Signout</a>
      </nav>

      <div className="page-wrap">

        <header className="main-header">
          <a href="#main-nav" className="open-menu">
            ☰
</a>
          <a href="#" className="close-menu">
            ☰
</a>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/' element={<VideoList />} />
          <Route path='/withdraw' element={<Withdraw />} />
          <Route path='/deposit' element={<Deposit />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/bypro' element={<ByPro />} />
        </Route>
      </Routes>
    </>
  )
}