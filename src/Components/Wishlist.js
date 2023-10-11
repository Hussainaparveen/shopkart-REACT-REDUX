import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.wishList);
  const cartProducts = useSelector((state) => state.cartProducts)
  function Navigate() {
    navigate('/AddToCart')
  }
  return (
    <>
      <div className='header'>
          <p id="header1">WOMEN</p>
          <p id="header1" >MEN</p>
          <p id="header1">JEWELLERY</p>
          <p id="header1">BRANDS</p>
        <h1>SHOPKART</h1>
        <img id="search" src="search.png" alt='' />
        <img id="myAcc" src="person.png" alt='' />
        <div id='cart1'>
          <img id="cart" src="wishlist.jpg" alt="wishlist" />
          <sup id='cart-count'>{products.length}</sup>
        </div>
        <div id='cart1'>
          <img id="cart" src="cart.png" alt="cart" onClick={Navigate} />
          <sup id='cart-count'>{cartProducts.length}</sup>
        </div>
      </div>
      <div>
        {products.map(function (value, index) {
          return (
            <div className="cartItems" key={index}>
              <img id="cart_img" src={value.image} alt="product" />
              <p id="prod_name"> Product Name: {value.title}</p>
              <p> Product Price: ${value.price}</p>
            </div>
          );
        })}
      </div>

    </>
  )
}

export default Wishlist