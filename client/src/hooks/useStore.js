import { create } from "zustand";
import axios from "axios";

export const useProduct = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  filteredProductsWOSearch: [],
  categories: [],
  cartState: false,
  cartProducts: [],
  getProducts: async () => {
    try {
      let response = await axios.get("/allProductos");
      let products = response.data;
      set((state) => ({ allProducts: products }));
      set((state) => ({ filteredProducts: products }));
    } catch (err) {
      console.log(err);
    }
  },
  getCategories: async () => {
    try {
      let response = await axios.get("/categorias");
      let categorias = response.data.categorias;
      console.log("getCategories: ", categorias);
      set((state) => ({ categories: categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  setFilter: (products) => {
    set((state) => ({ filteredProducts: products }));
    set((state) => ({ filteredProductsWOSearch: products }));
  },
  ordered: (order) => {
    if (order === "alfabetico-ascendente") {
      set((state) => ({
        filteredProducts: state.filteredProducts.sort((a, b) => {
          if (a.titulo > b.titulo) return 1;
          if (a.titulo < b.titulo) return -1;
          return 0;
        }),
      }));
    }
    if (order === "alfabetico-descendente") {
      set((state) => ({
        filteredProducts: state.filteredProducts.sort((a, b) => {
          if (a.titulo < b.titulo) return 1;
          if (a.titulo > b.titulo) return -1;
          return 0;
        }),
      }));
    }
    if (order === "popularidad") {
      set((state) => ({
        filteredProducts: state.filteredProducts.sort((a, b) => {
          if (a.rating < b.rating) return 1;
          if (a.rating > b.rating) return -1;
          return 0;
        }),
      }));
    }
  },
  searchProduct: (productos) => {
    if (typeof productos === "object" && productos.length) {
      set((state) => ({ filteredProducts: productos }));
    }
  },
  setCartAdd: (productId, quantity) => {
    let product = axios
      .get(`/product-detail/${productId}`)
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

    product.quantity = quantity;
    set((state) => ({ cartProducts: [...state.cartProducts, cartProduct] }));
  },
  setCartRemove: (productId) => {
    set((state) => ({
      cartProducts: state.cartProducts.filter((p) => p._id !== productId),
    }));
  },
  setActiveCart: () => {
    const { cartState } = get();
    set((state) => ({ cartState: state.cartState ? false : true }));
    console.log(cartState);
  },
}));

const useUser = create((set) => ({
  user: {},
  getUserInfo: async () => {
    set((state) => ({ user: state.bears + 1 }));
  },
  setUserInfo: async (userData) => {
    let post = await axios.post("/user", userData);
  },
}));
