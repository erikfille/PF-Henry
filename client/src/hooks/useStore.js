import { create } from "zustand";
import axios from "axios";
import { services } from "../Views/Servicios/helperService";

export const useProduct = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  filteredProductsWOSearch: [],
  categories: [],
  species: [],
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
      set((state) => ({ categories: categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  getSpecies: async () => {
    try {
      let response = await axios.get("/especies");
      let especies = response.data;
      console.log(especies);
      set((state) => ({ species: especies }));
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
  setCartAdd: async (productId, quantity) => {
    const { cartProducts, setCartRemove } = get();

    let response = await axios
      .get(`/product-detail/${productId}`)
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

    let product = response.data;
    product.quantity = Number(quantity);

    let repeatedProduct = cartProducts.find((p) => p._id === productId);

    if (repeatedProduct !== undefined) {
      let totalQuantity = [repeatedProduct.quantity];
      totalQuantity.push(quantity);
      product.quantity = totalQuantity.reduce(
        (acc, curr) => Number(acc) + Number(curr)
      );
      setCartRemove(productId);
    }
    set((state) => ({ cartProducts: [...state.cartProducts, product] }));
  },
  setCartRemove: (productId) => {
    const { cartProducts } = get();
    let filteredProducts = cartProducts.filter((p) => p._id !== productId);
    set((state) => ({
      cartProducts: filteredProducts,
    }));
  },
  setActiveCart: () => {
    const { cartState } = get();
    set((state) => ({ cartState: state.cartState ? false : true }));
  },
}));

const useUser = create((set) => ({
  user: {},
  getUserInfo: async () => {},
  setUserInfo: async (userData) => {
    let post = await axios.post("/user", userData);
  },
}));
