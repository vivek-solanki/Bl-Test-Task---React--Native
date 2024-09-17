import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cartItems";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, ...rest } = action.payload;
      if (!id) return; // Handle case where id might be undefined or invalid

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity < 10) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ id, ...rest, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (typeof quantity !== 'number' || quantity <= 0 || !id) return; // Validate quantity

      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (quantity > 10) {
          item.quantity = 10;
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      if (!id) return; // Handle case where id might be undefined or invalid

      state.items = state.items.filter((item) => item.id !== id);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

const saveCartToStorage = async (cartItems) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
};

export const loadCartFromStorage = async (dispatch) => {
  try {
    const cartData = await AsyncStorage.getItem(CART_KEY);
    if (cartData) {
      dispatch(cartSlice.actions.setCart(JSON.parse(cartData)));
    }
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
  }
};

export const { addToCart, updateQuantity, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
