import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Page1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productLikes, setProductLikes] = useState(false);

  useEffect(function () {
    fetch('https://fakestoreapi.com/products/')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "UPDATE_PRODUCTS", value: (json) });
      })
  }, []);
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cartProducts);
  const wishproducts = useSelector((state) => state.wishList);
  const flag = useSelector((state) => state.flag);
  function addToCart(index) {
    // get products from local storage assign to variable;

    // if product exist add the selected product to stored variable & set to local storage again

    // else create array of select product obj & set to localstorage

    dispatch({ type: "UPDATE_CART_PRODUCTS", value: products[index] });


  }

  function handleClick(id) {
    navigate(`prodDesc/${id}`);
  }

  function Navigate(e) {
    // e.preventDefault();
    navigate(`/AddtoCart`)
  }
  function filterByCategory(category) {
    // update the category in a state variable 
    // setSelectedCategory(category);
    dispatch({ type: "UPDATE_FILTERED_PRODUCTS", value: category })
  }


  // write filter based on the selected category
  //if selected category matches with products.category then that will be displayed 
  //else all the products will be displayed. 
  // const filteredProducts = selectedCategory
  // ? products.filter(product => product.category.includes(selectedCategory))
  // : products;

  const filteredProducts = useSelector((state) => state.filteredProducts);

  function handleLike(index) {

    const updatedLikes = { ...productLikes };
    updatedLikes[index] = !productLikes[index];
    setProductLikes(updatedLikes);
    dispatch({ type: "UPDATE_WISHLIST", value: products[index] });
  }
  function goTo() {
    navigate('/WishList');
  }


  return (
    <div>
      <div className='header'>
        <div className='d-flex'>
           <p>WOMEN</p>
           <p >MEN</p>
           <p>JEWELLERY</p>
           <p>BRANDS</p>
           </div>
        <h1>SHOPKART</h1>
        <div className='d-flex'>
        <img  className='box' src="search.png" alt='search' />
        <img   className='box' src="person.png" alt='myAccount' />
        <div className='d-flex' >
          <img id="cart" src="wishlist.jpg" alt="wishlist" onClick={goTo} />
          <sup id='cart-count'>{wishproducts.length}</sup>
        </div>
        <div >
          <img id="cart" src="cart.png" alt="cart" onClick={Navigate} />
          <sup id='cart-count'>{cartItems.length}</sup>
        </div>
        </div>
      </div>
      <h3 id="side_heading">FASHION <sup>20</sup></h3>
      <div id="add-ons">
        <button id="filter" onClick={() => filterByCategory("men's clothing")}>MEN</button>
        <button id="filter" onClick={() => filterByCategory("women's clothing")}>WOMEN</button>
        <button id="filter" onClick={() => filterByCategory("jewelery")}>JEWELLERY</button>
        <button id="filter" onClick={() => filterByCategory("electronics")}>ELECTRONICS</button>
        <button  id="filter" onClick={() => filterByCategory("")}>SHOW ALL</button>
      </div>
      <div className='app'>
        {filteredProducts.map(function (product, index) {
          return (
            <div key={product.id}>
              <div className="products">
                <img src={product.image} alt={product.title} onClick={() => handleClick(product.id)} />
                <p>{product.title}</p>
                <p>Price: ${product.price}</p>
              </div>
              <div id='add-button'>
                <button onClick={() => { addToCart(index) }}>Add To Cart</button>
                <img
                  id="wishlist"
                  src={productLikes[index] ? '/blackwish.png' : '/wishlist.jpg'}
                  alt="wishlist"
                  onClick={() => handleLike(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Page1
