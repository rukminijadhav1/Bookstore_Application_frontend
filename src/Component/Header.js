
import React from 'react';
import { AppBar, Box, Toolbar, Button,Typography} from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate,useNavigate } from 'react-router-dom';




function Header() {
  let navigate = useNavigate();

  const logOutHandler = () => {
    axios.post(`http://localhost:8086/User/Logout?token=${localStorage.getItem("Token")}`)
    .then((res) => {
        toast.success(res.data.message);
        localStorage.clear()
        setTimeout(() => { navigate("/Home"); }, 2000);
    })
    .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
}
    return (
        <div>
          
           <Box sx={{flexGrow:1}}>
          <AppBar position="static" color="secondary">
          <Toolbar>
          <Typography  variant="h4" component="div" sx={{
            flexGrow:1
          }}><AutoStoriesIcon/>&nbsp;
            Book-Store
            </Typography>
<Button component={NavLink} to='/Home' style={({ isActive}
            )=> {return { backgroundColor: isActive ? '#6d1b7b': ''}}} sx={{ color:'white', textTransform:'none'}}>Home</Button>

            <Button component={NavLink} to='/Login' style={({ isActive}
                )=> {return { backgroundColor: isActive ? '#6d1b7b': ''}}} sx={{color: 'white', textTransform:'none'}}>Login</Button>
<Button component={NavLink} to='/cart' style={({ isActive}
                    )=> {return { backgroundColor: isActive ? '#6d1b7b': ''}}} sx={{color: 'white', textTransform:'none'}}><ShoppingCartIcon/></Button>  
                <Button onClick={logOutHandler} component={NavLink} to='/Logout' style={({ isActive}
                    )=> {return { backgroundColor: isActive ? '#6d1b7b': ''}}} sx={{color: 'white', textTransform:'none'}}>Logout</Button>  
                </Toolbar>
                </AppBar>
        </Box>
            
        </div>
    );
}

export default Header;