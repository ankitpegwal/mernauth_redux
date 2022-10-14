import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
const navigate = useNavigate()
const  logOut =()=>{
    localStorage.clear()
    navigate('/register')
}

  return (
    <div>

<Button variant='btn' onClick={logOut} >
    Logout
</Button>

    </div>
  )
}
