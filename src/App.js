
import './App.css';
import Login from './Component/Pages/Login'
import Registration from './Component/Pages/Registration'
import { BrowserRouter, BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './Component/Pages/Home';
import Header from './Component/Header';
import Admin from './Component/Pages/Admin';
import Cart from './Component/Cart';
import PlaceOrder from './Component/plcaeOrder/PlaceOrder';
import { Logout } from '@mui/icons-material';





function App() {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route exact path='/Home' element={<Home/>} />
    <Route exact path='/Header' element={<Header/>} />
      <Route  exact path='/Login' element={<Login/>} />
      <Route  exact path='/Registration' element={<Registration/>}></Route>
      <Route  exact path='/Admin' element={<Admin/>} />
      <Route exact path='/Cart' element={<Cart/>}></Route>
      <Route exact path='/PlaceOrder' element={<PlaceOrder/>}></Route>
      <Route exact path='/Logout' element={<Logout/>}></Route>
  </Routes>
  </BrowserRouter>

    
  );
}

export default App;
