import React, { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from './redux/actions'


const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  )
  const [userLogin, setUserLogin] = React.useState({
    email: "",
    password: ""
  })
  const [err, setErr] = React.useState({
    erremail: "",
    errpassword: ""
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLogin({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    let token = localStorage.getItem("token")
   
    if (!token) {
      navigate('/login')
    }
    else{
      navigate('/')
    }
  }, [])

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value })
    setErr({})
  }
  console.log("hhhhhhhhh", userLogin);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userLogin.email == '' || userLogin.password == '') {

      // alert("Feilds required");
      setErr({ erremail: "Feilds required" })
    }else if (!regExp.test(userLogin.email)) {

      // alert("")
      setErr({ erremail: "Email format invalid." })
    }else {
      let newLogin = { ...userLogin }
      dispatch(actions.Login(newLogin)).then((result) => {
        console.log("resulssst", result);

        localStorage.setItem("token", result.token)
        localStorage.setItem("id", result._id)
       if(result.status==400){
           setErr({errpassword:"Invalid credentials"})
       }
  if(result?.token?.length>0){
    navigate('/')
  
    
  }
  setUserLogin({})
  
      })
        .catch(err => {
        
          console.log(err)
        })
    }






  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
          placeholder="Email Address"
              name="email"
              autoComplete="email"
              value={userLogin.email}
              onChange={handleInput}

            />
            <p style={{color:"red"}} >{err.erremail} </p>
            <p style={{color:"red"}} >{err.errpassword} </p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              value={userLogin.password}
              onChange={handleInput}


            />
           

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>

              <Grid item>
                <NavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}