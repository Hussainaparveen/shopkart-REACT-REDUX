import './App.css';
import { Routes, Route } from 'react-router-dom';
import Page1 from './Components/Page1';
import ProdDesc from './Components/ProdDesc';
import AddToCart from './Components/AddToCart';
import NoPage from './Components/NoPage';
import Wishlist from './Components/Wishlist'

function App() {


  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Routes>
        <Route path='/' element={<Page1 />} />
        <Route path='/ProdDesc/:id' element={<ProdDesc />} />
        <Route path='/AddToCart' element={<AddToCart />} />
        <Route path='/Wishlist' element={<Wishlist />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
