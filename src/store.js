import { createStore } from "redux";

const initialState = {
    products: [],
    cartProducts: [],
    prodData: [],
    filteredProducts: [],
    wishList: [],
}
function Reducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_PRODUCTS": {
            return { ...state, products: action.value, filteredProducts: action.value };
        }
        case "UPDATE_CART_PRODUCTS": {
            let selectedProduct = action.value;
            return { ...state, cartProducts: state.cartProducts.concat(selectedProduct) };
        }
        case "UPDATE_PROD_DATA": {
            return { ...state, prodData: [action.value] };
        }
        case "UPDATE_FILTERED_PRODUCTS": {
            let selectedCategory = action.value;

            const filteredProducts = selectedCategory
                ? state.products.filter(product => product.category.includes(selectedCategory))
                : state.products;
            return { ...state, filteredProducts: filteredProducts }
        }
        case "UPDATE_WISHLIST": {
            let likedProduct = action.value;
            return { ...state, wishList: state.wishList.concat(likedProduct) };
        }
        default:
            return { ...state };
    }
}
export const store = createStore(Reducer);