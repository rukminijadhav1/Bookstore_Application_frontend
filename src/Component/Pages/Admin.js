import React from 'react';
import { Container } from '@mui/system';
import { Avatar, Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';
import Header from '../Header'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Admin() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookQuantity, setBookQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [bookImage, setBookImage] = useState("");
  
  let BookData = {
    bookName: bookName,
    authorName: authorName,
    bookQuantity: bookQuantity,
    price: price,
    bookImage: bookImage.name,
}
let navigate=useNavigate();
const handleSubmit = (e) => {
    e.preventDefault();
      console.log(BookData);
      axios.post(`http://localhost:8086/BookStore/Add_Book?token=${localStorage.getItem("Token")}`, BookData)
     .then((res) => {
        console.log(res.data);
        console.log(bookImage);
        toast.success(res.data.message);
        document.getElementById("Add-books").reset();
        navigate("/Home");
     })
     .catch((error) => {
        toast.error(error.response.data);
        console.log(error) }) 
  };
   
    return (
        <div>
            <Header/>
    <Container component= "main" maxWidth="md">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 4,
          display:"flex",
          flexDirection:"column",
          alignItems:"center"

        }}
        >
        <Avatar sx={{ m : 1, bgcolor: "secondary.main" }}>
          <MenuBookTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Add Books
        </Typography>
        <Box component="form" id='Add-books' noValidate sx={{ mt : 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
              onChange={(event) => {setBookName(event.target.value)}}
                fullWidth
                id="bookName"
                label="Book Name"
                name="bookName"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
               onChange={(event) => {setAuthorName(event.target.value)}}
                required
                fullWidth
                id="authorName"
                label="Book AuthorName"
                name="authorName"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
              onChange={(event) => {setBookImage(event.target.files[0])}}
                type="file"
                accept='image/*'
                required
                fullWidth
                id="bookImage"
                name="bookImage"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Upload Book Image</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              onChange={(event) => {setBookQuantity(event.target.value)}}
                required
                fullWidth
                id="bookQuantity"
                label="Book Quantity"
                name="bookQuantity"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
              onChange={(event) => {setPrice(event.target.value)}}
                required
                fullWidth
                id="price"
                label="Book Price"
                name="price"
                autoComplete="off"
              />
            </Grid>
          </Grid>

          <Link to="/Home"> <Button
          onClick={handleSubmit}
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button></Link>
        </Box>
        <ToastContainer autoClose={2000} />
        </Box>  
    </Container>
            
        </div>
    );
}


export default Admin;