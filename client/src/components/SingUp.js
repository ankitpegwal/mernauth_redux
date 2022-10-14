import   React,{useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from './redux/actions'

const theme = createTheme();

export default function SignUp() {

const navigate = useNavigate()
const dispatch = useDispatch();

    const [userRegistration, setUserRegistration] = useState({
        name: "",
        email: "",
        zipCode: "",
        profilePic: "",
        phone: "",
        password: "",
        latitude: 0,
        longitude: 0
    })
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserRegistration({latitude:position.coords.latitude,longitude:position.coords.longitude})
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
          let token = localStorage.getItem("token")
          if(token){
              navigate("/")
          }
        
    },[])
    console.log(userRegistration.longitude)
    const regExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    )
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({ ...userRegistration, [name]: value })
        console.log(userRegistration);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(userRegistration.email == '' || userRegistration.password == '' || userRegistration.zipCode == null){
            // setErrMessage("Fields can't be empty.")
            alert("Feilds required");
        }
        if (!regExp.test(userRegistration.email)) {
              
                alert("Email format invalid.")
            }
      let newEntry = {...userRegistration}
      dispatch(actions.Register(newEntry)).then((result)=>{
        console.log("result",result);
            if(result.status==true){
                navigate("/login")
            }
            

      })
      .catch(err => {
       
        console.log(err)
      })
       
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="Name"
                                    placeholder="Name"
                                    autoFocus
                                    value={userRegistration.name}
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    value={userRegistration.phone}
                                    id="phone"
                                    placeholder="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                 name="zipCode"
                                    required
                                    value={userRegistration.zipCode}
                                    fullWidth
                                    id="zipCode"
                                    label="Zip Code"
                                    
                                    onChange={handleInput}
                                />
                            </Grid>
                         
                            <Grid item xs={12} sm={6}>
                                <TextField
                                 
                                    fullWidth
                                    value={userRegistration.mobile}
                                    id="mobile"
                                    placeholder="Mobile"
                                    name="mobile"
                                    autoComplete="mobile"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    value={userRegistration.email}
                                    placeholder="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    requiredtype="file"
                                    fullWidth
                                    value={userRegistration.password}
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                    onChange={handleInput}
                                />
                            </Grid> 
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/login" variant="body2" style={{cursor:"pointer"}} >
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
              
            </Container>
        </ThemeProvider>
    );
}