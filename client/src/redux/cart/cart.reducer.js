import CartActionTypes from "./cart.types";

import {
  addItemToCart,
  removeItemFromCart,
  removeOneOrTheWholeItemFromCart
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

export default function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeOneOrTheWholeItemFromCart(
          state.cartItems,
          action.payload
        )
      };
    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    default:
      return state;
  }
}