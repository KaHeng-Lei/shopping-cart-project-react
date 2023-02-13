export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // we dont directly update the state,
      // instead we return a new object that contains new informatioin
      // Using spread operator to get all the key-value from the state
      // reducer will automatically replace the update part (state.cart) with the second element, 'cart: xxx'
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      //change between true or false;
      //no need any information carried in payload
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      //change between true or false;
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      //onChange will fire dispatch and send the index of 'Star'
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    default:
      return state;
  }
};
