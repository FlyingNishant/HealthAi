import './App.css'
import {  Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import authService from './services/authService';
import { useDispatch } from 'react-redux';
import { login as userLogin } from './features/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCognitoUserDetails()
      .then((userData) => {
        if(userData) {
          dispatch(userLogin(userData));
        }else{
          dispatch(logout());
        }
      }).catch((e) => {
        console.log(e)
      })
      .finally(() => setLoading(false))
  }, []);

  return ! loading ? (
    <Outlet/>
  ) : null

}

if (global === undefined) { var global = window; }

export default App
