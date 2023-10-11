import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

function ProdDesc() {
  const [productLikes, setProductLikes] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(function () {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "UPDATE_PROD_DATA", value: (json) })
      })
    return()=>{
      dispatch({type:"UPDATE_PROD_DATA",value:{}})
    }
  }, []);

  function Navigate() {
    navigate('/AddToCart')
  }
  function goToWishList() {
    navigate('/Wishlist');
  }
  const prodData = useSelector((state) => state.prodData);
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cartProducts);
  const wishproducts = useSelector((state) => state.wishList);

  function handleLike(index) {

    const updatedLikes = { ...productLikes };
    updatedLikes[index] = !productLikes[index];
    setProductLikes(updatedLikes);
    dispatch({ type: "UPDATE_WISHLIST", value: products[index] });
  }

  function addToCart(id) {
    dispatch({ type: "UPDATE_CART_PRODUCTS", value: products[id - 1] });
    // navigate('/AddToCart')
  }
  return (
    <div >
      <div className='header'>
          <p id="header1">WOMEN</p>
          <p id="header1" >MEN</p>
          <p id="header1">JEWELLERY</p>
          <p id="header1">BRANDS</p>
        <h1>SHOPKART</h1>
        <img className='box' src="/search.png" alt='search' />
        <img id="myAcc" src="/person.png" alt='myAccount' />
        <div id='cart1'>
          <img id="cart" src="/wishlist.jpg" alt="wishlist" onClick={goToWishList} />
          <sup id='cart-count'>{wishproducts.length}</sup>
        </div>
        <div id='cart1'>
          <img id="cart" src="/cart.png" alt="cart" onClick={Navigate} />
          <sup id='cart-count'>{cartItems.length}</sup>
        </div>
      </div>
      <div id='desc-page'>
      {prodData.map(function (value, index) {
        return (
          <div className='desc-data'>
            <div id="desc_head" key={index}>
              <img id="prodDesc_img" src={value.image} alt="products" />
            </div>
            <div className='prodDesc'>
             <p id='prod-title'> {value.title}</p>
             <p id='prod-price'>${value.price}</p>
              <p id='prod-desc' >{value.description}</p>
              <p id='color1'>Color</p>
              <img  id='color' src='/color1.png' alt='color1'/>
              <img  id='color'src='/color2.png' alt='color2'/>
              <p className='size'>Size</p>
              <div className='size'>
              <button id='size'>S</button>
              <button id='size'>M</button>
              <button id='size'>L</button>
              <button id='size'>XL</button>
              </div>
              <button id='click-add' onClick={() => { addToCart(value.id) }}>Add To Cart</button>
              <img
                id="wishlist1"
                src={productLikes[index]? '/blackwish.png' : '/wishlist.jpg'}
                alt="wishlist"
                onClick={() => handleLike(index)}
              /><br/>
              <ul>
                <li id='list-title'>characteristics</li><br/>
                <li id='id'>ID<p id='id-data'>{id}</p></li>
                <li id='category'>Category <p id='id-data'>{value?.category}</p></li>
                <li id='rate'> Rating <p id='id-data'> {value?.rating?.rate}</p></li>
                <li id='stock'>Available Stock <p id='id-data'>{value?.rating?.count}</p></li>
              </ul>
            </div>
          </div>
        )
      })}
      </div>
      <h1>another </h1>
    </div>
  );
}
export default ProdDesc;
