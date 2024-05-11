import { Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import "./Navbar.css"
import SearchIcon from "@mui/icons-material/Search";
import { pink } from '@mui/material/node/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/store';

function Navbar() {
  const navigate=useNavigate();
  const {auth,cart}=useSelector(store=>store)
  const handleAvatarClick=()=>{
    if(auth.user?.role==="ROLE_CUSTOMER"){
      navigate("/my-profile")
    }
    else{
      navigate("/admin/restaurant")
    }
  }

  return (
    <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>

      
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li className='logo font-semibold test-gray-300 text-2xl' onClick={()=>navigate("/")}>
            Reddy's Kitchen
        </li>
      </div>

      <div className='flex items-center space-x-2 lg:space-x-10'>

          <div className=''>
              <IconButton>
                <SearchIcon sx={{fontSize:"1.5rem"}} />
              </IconButton>
          </div>
          <div className='' >

              {auth.user ?<Avatar onClick={()=>handleAvatarClick()} sx={{bgcolor:"white",color:pink.A400}}>{auth.user.fullName[0].toUpperCase()}</Avatar>:
              <IconButton onClick={()=>navigate("/account/login")}>
                <Person/> 
              </IconButton>
              }

          </div>

          <div className=''>
              <Badge color="secondary" badgeContent={cart?.cart?.item.length} onClick={()=>navigate("/cart")}>
                <ShoppingCartIcon sx={{fontSize:"1.5rem"}} />
              </Badge>
          </div>

      </div>
        


     
       
    </div>
    
  )
}

export default Navbar