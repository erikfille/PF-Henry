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
  setCartAdd: async (productId, quantity, stock) => {
    const { cartProducts, saveCartToStorage } = get();

    let repeatedProduct = cartProducts.find((p) => p._id === productId);

    if (repeatedProduct !== undefined) {
      repeatedProduct.quantity = quantity;
    } else {
      let response = await axios
        .get(`/product-detail/${productId}`)
        .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

      let product = response.data;
      product.quantity = Number(quantity);

      set((state) => ({ cartProducts: [...state.cartProducts, product] }));
    }
    saveCartToStorage()
  },
  setCartRemove: (productId) => {
    const { cartProducts, saveCartToStorage } = get();
    let filteredProducts = cartProducts.filter((p) => p._id !== productId);
    set((state) => ({
      cartProducts: filteredProducts,
    }));
    saveCartToStorage()
  },
  setActiveCart: () => {
    const { cartState } = get();

    if (cartState === false) {
      let recoveredCart = JSON.parse(window.sessionStorage.getItem("cart"));
      recoveredCart && set((state) => ({ cartProducts: recoveredCart }));
    }
    set((state) => ({ cartState: state.cartState ? false : true }));
  },
  saveCartToStorage: () => {
    const { cartProducts } = get();
    window.sessionStorage.setItem("cart", JSON.stringify(cartProducts))
  }
}));

export const useModal = create((set) => ({
  modalState: false,
  modalProps: {},
  actionArgs: {},
  setModal: (title, text, action, args) => {
    if (title && text && action)
      set((state) => ({ modalProps: { title, text, action } }));
    if (args) set((state) => ({ actionArgs: args }));

    set((state) => ({ modalState: state.modalState ? false : true }));
  },
}));

const useUser = create((set) => ({
  user: {},
  getUserInfo: async () => {},
  setUserInfo: async (userData) => {
    let post = await axios.post("/user", userData);
  },
}));

export const useServices = create((set, get) => ({
  // allServices: [],
  // filteredServices: [],
  allServices: services,
  filteredServices: services,
  filteredServicesWOSearch: [],
  // getServices: async () => {
  // 	try {
  // 		let response = await axios.get("/proveedores");
  // 		let services = response.data;
  // 		set((state) => ({ allServices: services }));
  // 		set((state) => ({ filteredServices: services }));
  // 	} catch (err) {
  // 		console.log(err);
  // 	}
  // },
  ordered: (order) => {
    if (order === "alfabetico-ascendente") {
      set((state) => ({
        filteredServices: state.filteredServices.sort((a, b) => {
          if (a.nombre > b.nombre) return 1;
          if (a.nombre < b.nombre) return -1;
          return 0;
        }),
      }));
    }
    if (order === "alfabetico-descendente") {
      set((state) => ({
        filteredServices: state.filteredServices.sort((a, b) => {
          if (a.nombre < b.nombre) return 1;
          if (a.nombre > b.nombre) return -1;
          return 0;
        }),
      }));
    }
  },
  setFilter: (service) => {
    set((state) => ({ filteredServices: service }));
    set((state) => ({ filteredServicesWOSearch: service }));
  },
  searchServices: (service) => {
    if (typeof service === "object" && service.length) {
      set((state) => ({ filteredServices: service }));
    }
  },
}));
