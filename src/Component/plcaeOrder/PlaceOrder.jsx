import React, { useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { Accordion, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css'



function PlaceOrder() {
    let navigate = useNavigate();

    const [cartBooks, setCartBooks] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [totalCartQty, setTotalCartQty] = useState(0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const[quantity,setQuantity]=useState("");
    const[type,setType]=useState("");
    
   

    let shippingAddress = {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        pincode: pincode,
        address: address,
        city: city,
        quantity: quantity,
        type: type
       }
      
    
       useEffect(() => {
        document.title = 'Place Order';
        fetchUserData();
      }, [])
  
      const fetchUserData = () => {
        axios.get(`http://localhost:8086/User/fetchuserdata?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res.data.obj)
            setUserData(res.data.obj);
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const placeOrder = () => {
        console.log(shippingAddress);
        axios.post(`http://localhost:8086/Order/placedOrder?token=${localStorage.getItem("Token")}`,shippingAddress)
        .then((res) => {
            toast.success(res.data.message, {position: toast.POSITION.TOP_CENTER} );
            setOrderDetails(res.data.obj)
            console.log(res.data)
            setTimeout(() => { navigate("/PlaceOrder"); }, 4000);
            fetchUserData();
          })
          .catch((err) => {
            toast.error(err.response.data);
        });
    }

    

    
    return (
        <div className="main-container">
        <Header/>
        <div>
           <div className='orderContainer'>
                <Accordion sx={{ width: '50%', justifyContent: 'center' }}>
                    <AccordionDetails>
                        <Box component="form" noValidation sx={{ mt: 3}}>
                            <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setFirstName(event.target.value)}}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">First Name:</InputAdornment>,
                                      }}
                                    name='firstName'
                                    autoComplete='off'
                                   
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setLastName(event.target.value)}}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Last Name:</InputAdornment>,
                                      }}
                                    name='lastName'
                                    autoComplete='off'
                                />
                            </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setAddress(event.target.value)}}
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Address:</InputAdornment>,
                                      }}
                                    name='address'
                                    autoComplete='off'
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={(event) => {setCity(event.target.value)}}
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">City:</InputAdornment>,
                                      }}
                                    name='city'
                                    autoComplete='off'
                                    
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    onChange={(event) => {setPincode(event.target.value)}}
                                    required
                                    fullWidth
                                    id="pinCode"
                                    label="Pin Code"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Pin Code:</InputAdornment>,
                                      }}
                                    name='pinCode'
                                    autoComplete='off'
                                   
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setContact(event.target.value)}}
                                    required
                                    fullWidth
                                    id="contact"
                                    label="Contact Number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Contact No:</InputAdornment>,
                                      }}
                                    name='Contact no'
                                    autoComplete='off'
                                    
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setQuantity(event.target.value)}}
                                    required
                                    fullWidth
                                    id="quantity"
                                    label="quantity"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Quantity:</InputAdornment>,
                                      }}
                                    name='quantity'
                                    autoComplete='off'
                                    
                                />
                                </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => {setType(event.target.value)}}
                                    required
                                    fullWidth
                                    id="type"
                                    label="type"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Type:</InputAdornment>,
                                      }}
                                    name='type'
                                    autoComplete='off'
                                    
                                />
                                </Grid>
                            <Button
                            onClick={placeOrder}
                              variant="contained"
                                sx={{ mt: 3, mb: 2, ml: '42.8%' , fontWeight: 'bold' }}
                            >
                            checkout
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
        <ToastContainer autoClose={2000} />
          
        </div>
    );
}

export default PlaceOrder;