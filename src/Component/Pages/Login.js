import React from 'react';
import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

import Header from '../Header';
import { user,useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const[email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
 let user={
  email:email,
  password:password
 }
let navigate=useNavigate();

const handleSubmit=(e)=>{
  e.preventDefault();
  if(user.email==="" || user.password===""){
    alert("please provide login details")
}
  else{
    axios.post("http://localhost:8086/User/Login",user)
    .then((response)=>{
      toast.success(response.data.message);
      console.log(response);
      localStorage.setItem("Token",response.data.user);
      console.log(localStorage.getItem("Token"));
      navigate("/Home")
    })
    .catch((error)=>{toast.error(error.response);})
  }
}
return (
 <div className="main1">
  <Header></Header>
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
    Login 
  </Typography>
  <Box component="form" noValidate sx={{ mt: 1 }}>
    <TextField
          onChange={(event) => {setEmail(event.target.value)}}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address/UserId"
          name="email"
          autoComplete="off"
          autoFocus
      />
      <TextField
          onChange={(event) => {setPassword(event.target.value)}}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
      />
      <Link to="/Home"> <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }} >
          Sign In
        </Button></Link>
       <Grid Container justifyContent= "flex-end">
       <Grid item>
           Already have an account? Sign in
           </Grid>
            </Grid>
           </Box>
           </Box>
        
</div>
)
}
export default Login;
