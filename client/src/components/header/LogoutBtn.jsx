import React from 'react'
import { Button } from '@mui/material';
import authService from '../../services/authService';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
      try{
        await authService.signOut()
        navigate('/login');
        dispatch(logout());
      }catch(err){
        console.log(err)
      }
    }
    

  return (
    <Button
        variant='contained'
        color='error'
        onClick={logoutHandler}
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >Logout</Button>
  )
}

export default LogoutBtn