import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderCount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage: (state, action) => {
      console.log(action.payload);
      const { items, orderCount } = action.payload;
      state.items = items;
      state.orderCount = orderCount;
    },
    checkoutCart: (state, action) => {
      state.items = [];
      state.orderCount += 1; // Increment order count on checkout
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((shoe) => action.payload !== shoe.id);
    },
    increaseQty: (state, action) => {
      state.items = state.items.map((shoe) =>
        shoe.id === action.payload ? { ...shoe, qty: shoe.qty + 1 } : shoe
      );
    },
    decreaseQty: (state, action) => {
      state.items = state.items.map((shoe) =>
        shoe.id === action.payload ? { ...shoe, qty: shoe.qty - 1 } : shoe
      );
    },
  },
});
export const {
  setCartFromLocalStorage,
  checkoutCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = CartSlice.actions;
export default CartSlice.reducer;
