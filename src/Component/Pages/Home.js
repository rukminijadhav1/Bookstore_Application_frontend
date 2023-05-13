import {  Button, CardActions, CardContent,Card,CardMedia,Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../Header';
import Pagination from '../Pagination/Pagination';
import './Home.css'
import Login from './Login';
import { Stack } from '@mui/system';




function Home() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const[login,setLogin]=useState(false);
    const [showPerPage,setShowPerPage]=useState(8);
    const [pagination,setPagination]=useState({start:0,end:showPerPage})

    const onPaginationChange=(start,end)=>{
    setPagination({start:start,end:end})
  }
      useEffect(() => {
      document.title = 'Home-Page';
        const getBooks = async () => {
        const reqData = await fetch("http://localhost:8086/BookStore/fetchBooks");
        const resData = await reqData.json();
        setBooks(resData.user);
        console.log(resData);
      };
        getBooks();
       if(localStorage.getItem("Token")===null){
        setLogin(false)
       }
       else{
        setLogin(true)
       }
        },[]);
        console.log(books);
        const addToCart = (bookId) => {
        if (login) {
          axios
            .post(`http://localhost:8086/Cart/AddtoCart?token=${localStorage.getItem("Token")}&bookId=${bookId}`)
            .then((res) => {
            toast.success(res.data.message);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error("please login to buy book");
        }
      };
      const sorting = (e) => {
        console.log(e.target.value);
        if (e.target.value === "Asc") {
          axios.get("http://localhost:8086/BookStore/Sort_Price_LowToHigh")
          .then((res) => {
            console.log(res);
            setBooks(res.data.user);
          })
        }
        if (e.target.value === "Dsc") {
          axios.get("http://localhost:8086/BookStore/sortPrice_by_HighToLow")
          .then((res) => {
            setBooks(res.data.user);
          })
        }
      }
      return (
        <div>
          <div className="main2">
        <Header/>
       
      <div className="searchSortBar">
        <text className="bookText">Books</text>
        <input
          type="text"
          id="myInput"
          placeholder="Search for Book.."
          title="Type in a name"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      <select className="selectBar" onChange={sorting}>
          <option>Sort by Relevance</option>
          <option value="Asc">Price: LowtoHigh</option>
          <option value="Dsc">Price: HightoLow</option>
       
        </select>
        <div className="container">
         {books.filter(book=>{
          if(search===""){
            return book;
          }
          else if(book.bookName.toLowerCase().includes(search))
          return book;
         }).slice(pagination.start,pagination.end).map((book,index)=>{
            return(
      <div className="card">
      <Card  sx={{ maxWidth: 90 }}>
      <CardMedia
                      component="img"
                      height="190"
                      image={`./uploads/${book.bookImage}`}
                      alt="Image Not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>
      <div className="cardimg1">
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          {book.bookName}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
         {book.authorName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
         {book.price}
        </Typography>
        </CardContent>
        </div>
      <Stack spacing={1} direction="row">
      <div className="addtocart">
      <Button  onClick={() => addToCart(book.bookId)} variant="outlined">addToCart</Button></div>
      <div className="wishlist">
      <Button variant="outlined">WishList</Button></div>
      </Stack>
     </Card>
    </div>
   )
  })
  }
</div> 
<div className='pagination'>
<Pagination showPerPages={showPerPage} onPagination={onPaginationChange} totalPage={books.length}/>
</div>
</div>
</div> 
</div>
);
}
export default Home;