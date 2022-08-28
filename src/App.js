import { Routes, Route } from 'react-router-dom'
import ByPro from './views/byPro'
import Deposit from './views/deposit'
import Login from './views/login'
import Register from './views/register'
import VideoList from './views/videoList'
import Withdraw from './views/withdraw'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<VideoList />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/withdraw' element={<Withdraw />} />
      <Route path='/deposit' element={<Deposit />} />
      <Route path='/bypro' element={<ByPro />} />
    </Routes>
  )
}