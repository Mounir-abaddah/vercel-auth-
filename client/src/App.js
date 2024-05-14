import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import {Toaster} from 'react-hot-toast'
import ProtecteRoute from './Components/ProtecteRoute';
import { useSelector } from 'react-redux';
import Reserver from './pages/Reserver/Reserver';
import Notifications from './Components/Notifications/Notifications';
// import Admine from './pages/Admine/Admine/Admine';
import UserList from './Components/UserList/UserList';
import Acceuil_Admin from './Components/Admin/Acceuil/Acceuil_Admin';
import Rendezvous from './pages/Rendezvous/Rendezvous';
import Profile from './pages/Profile/Profile';

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);
  return (
    <BrowserRouter>
          {loading && (
        <div className='spinner-parent'>
          <div class="spinner-border" role="status">
          </div>
        </div>
      )}
    <Toaster position="bottom-right" reverseOrder={false} />
    <Routes>
      <Route path='/' element={<ProtecteRoute><Home /></ProtecteRoute>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reservation' element={<ProtecteRoute><Reserver /></ProtecteRoute>} />
      <Route path='/Notifications' element={<ProtecteRoute><Notifications /></ProtecteRoute>} />
      <Route path='/profile/:userId' element={<ProtecteRoute><Profile /></ProtecteRoute>} />
      <Route path='/Rendez_vous' element={<ProtecteRoute><Rendezvous /></ProtecteRoute>} />
      <Route path='/admin/user-lists' element={<ProtecteRoute><UserList /></ProtecteRoute>} />
      <Route path='/admin/Acceuil' element={<ProtecteRoute><Acceuil_Admin /></ProtecteRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App