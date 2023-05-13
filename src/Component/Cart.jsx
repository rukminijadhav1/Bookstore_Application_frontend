import {  Button, CardActions, CardContent,Card,CardMedia,Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import { toast } from 'react-toastify';
import './Cart.css'
import { Stack } from '@mui/system';



function Cart() {
    const [cartBooks, setCartBooks] = useState([])

   useEffect(() => {
        document.title = 'Cart-Page';
        getCartBooks();
        },[]);

   
    const getCartBooks = async () => {
      console.log(cartBooks);
        const reqData = await fetch(`http://localhost:8086/Cart/Show_Cart_Record?token=${localStorage.getItem("Token")}`);
        const resData = await reqData.json();
        setCartBooks(resData.user);
        console.log(resData);
    };
const removeFromcart=(bookId)=>{
        console.log(bookId);
        axios.delete(`http://localhost:8086/Cart/RemoveFromCart?token=${localStorage.getItem("Token")}&bookId=${bookId}`)
        .then((res) => {
        toast.success(res.data.message);
        console.log(res);
        getCartBooks();
        })
        .catch((error) => {
        console.log(error);
        });
    }
    let navigate = useNavigate();
   
    const increaseBookQty= (bookId) => {
        axios.put(`http://localhost:8086/Cart/BookQty?token=${localStorage.getItem("Token")}&bookId=${bookId}`)
        .then((res) => {
          toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER} );
          console.log(res.data)
          getCartBooks();
         })
        .catch((err) => {
          toast.error(err.response.data);
      });
      }
    const decreaseBookQty= (bookId) => {
        axios.put(`http://localhost:8086/Cart/decreaseBookQty?token=${localStorage.getItem("Token")}&bookId=${bookId}`)
        .then((res) => {
          toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER});
          getCartBooks();
         })
        .catch((err) => {
          toast.error(err.response.data);
      });
      }
      return (
        <div className="main">
            <Header></Header>
           
            <div className="container">
           {cartBooks.map((cartBooks)=>{
            return(
        <div className="card1">
        <Card  sx={{ maxWidth: 120 }}>
      <CardMedia
                      component="img"
                      height="190"
                      image={`./uploads/${cartBooks.books.bookImage}`}
                      alt="Image Not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>
      <div className="cardimg">
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          {cartBooks.books.bookName}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
         {cartBooks.books.authorName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
         {cartBooks.price}

        </Typography>
        </CardContent>
        <div className='countOfItems'>
                  <button onClick={() => decreaseBookQty(cartBooks.books.bookId)} disabled={cartBooks.bookQuantity === 1}> - </button>
                  <input  value={cartBooks.quantity} className="count" type="text" name="countOfBook" id="Name" required />
                  <button onClick={() => increaseBookQty(cartBooks.books.bookId)}> + </button>
                </div>
      </div>
      <CardActions >
      <div className="remove">
      <Stack spacing={1} direction="">
      <Button onClick={()=>removeFromcart(cartBooks.books.bookId)} variant="outlined">removebook</Button>
     </Stack>
    </div>
    </CardActions>
      </Card>
    </div>
  )
})}
<div className="Button">
<Button size="small" onClick={()=>{navigate("/PlaceOrder")}} >PlaceOrder</Button></div>
</div>
</div>
   
    );
}
export default Cart;