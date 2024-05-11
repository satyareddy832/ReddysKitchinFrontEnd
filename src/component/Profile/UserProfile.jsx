import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../State/Authentication/Action';

const UserProfile = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=()=>{
    dispatch(logout());
      navigate("/");
  }
  const {auth}=useSelector(store=>store);
  return (
    <div>
      <center className='py-20'>
        <AccountCircleIcon sx={{fontSize:"10rem"}} />
        <h1 className='py-5 test-5xl font-semibold '>{auth.user.fullName}</h1>
        <p className='py-1 test-5xl font-semibold '>Email : {auth.user.email}</p>
        <Button sx={{margin:"2rem 0rem"}} variant="contained" onClick={handleLogout}>LogOut</Button>
      </center>
        

    </div>
  )
}

export default UserProfile;