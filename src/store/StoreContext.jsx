import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "clicon_clone_store";

const StoreContext = createContext(null);

const defaultState = {
  cart: [],
  wishlist: []
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : []
    };
  } catch {
    return defaultState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existing = state.cart.find((product) => product.id === item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((product) =>
            product.id === item.id ? { ...product, qty: product.qty + 1 } : product
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...item, qty: 1 }]
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload)
      };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id
            ? { ...product, qty: Math.max(1, action.payload.qty) }
            : product
        )
      };
    case "TOGGLE_WISHLIST": {
      const item = action.payload;
      const inWishlist = state.wishlist.some((product) => product.id === item.id);
      if (inWishlist) {
        return {
          ...state,
          wishlist: state.wishlist.filter((product) => product.id !== item.id)
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, item]
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
