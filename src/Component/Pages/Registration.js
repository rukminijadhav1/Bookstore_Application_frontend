import React from "react";
import { Box,Grid,TextField,Button, } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from 'react'
import { toast} from 'react-toastify';
import axios from 'axios';
import Header from "../Header";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'




function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

let user={
    firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cartmodel:{
            
        }
}
console.log(user);
let navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8086/User/Register_user", user)
       .then((responce) => { toast.success(responce.data.message);
        setTimeout(() => { navigate("/Login"); }, 3000);
        })
        .catch((error) => { toast.error(error.response.data); })
};
    return (
        <div>
            <Header/>
<Box
    sx={{
        marginTop: 1,
        display:"flex",
        flexDirection:"column",
        alignItems:"center"

    }}
>
<Box component="form" noValidate sx={{ mt: 1 }}>
        <Grid container spacing={1}>
            <Grid item xs={7}>
                <TextField
                onChange={(event) => {setFirstName(event.target.value)}}
                    required
                    fullWidth
                    id="FirstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="off"
                />
            </Grid>
<Grid item xs={7}>
                <TextField
                 onChange={(event) => {setLastName(event.target.value)}}
                    required
                    fullWidth
                    id="LastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="off"
                />
            </Grid>
<Grid item xs={7}>
                <TextField
                onChange={(event) => {setEmail(event.target.value)}}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="off"
                />
            </Grid>
            <Grid item xs={7}>
                <TextField
                onChange={(event) => {setPassword(event.target.value)}}
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="off"
                />
            </Grid>
<Button
 onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt:3, mb:2, px:5 }}
        >
            Sign Up
        </Button>
<Grid Container justifyContent= "flex-end">
            <Grid item>
                <Link onClick={ () => { Navigate("/Login") }} variant="body2">
                    Already have an account? Sign in
                </Link>
            </Grid>
        </Grid>
        </Grid>
    </Box>
    </Box>


    </div>
    );
}

export default Registration;
