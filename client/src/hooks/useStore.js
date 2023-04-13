import { create } from "zustand";
import axios from "axios";

export const useProduct = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  filteredProductsWOSearch: [],
  categories: [],
  species: [],
  cartState: false,
  cartProducts: [],
  storePage: 1,
  storeMaxPage: 1,
  productReviews: [],
  getProducts: async () => {
    const { maxPage } = get();

    try {
      let response = await axios.get("/allProductos");
      let products = response.data;
      set((state) => ({ allProducts: products }));
      set((state) => ({ filteredProducts: products }));
      maxPage();
    } catch (err) {
      console.log(err);
    }
  },
  getCategories: async () => {
    try {
      let response = await axios.get("/categorias");
      let categorias = [
        ...new Set(response.data.categorias.map((c) => c.nombre)),
      ];
      set((state) => ({ categories: categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  getSpecies: async () => {
    try {
      let response = await axios.get("/especies");
      let especies = response.data;
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
    const { saveCartToStorage } = get();

    let savedCart = JSON.parse(window.localStorage.getItem("cart"));

    let cartProducts = savedCart;

    let repeatedProduct = cartProducts.find((p) => p._id === productId);

    if (repeatedProduct) {
      repeatedProduct.quantity = quantity;
      set((state) => ({ cartProducts: cartProducts }));
    } else {
      let response = await axios
        .get(`/product-detail/${productId}`)
        .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

      let product = response.data;
      product.quantity = Number(quantity);

      set((state) => ({ cartProducts: [...state.cartProducts, product] }));
    }
    saveCartToStorage();
  },
  setCartRemove: (productId) => {
    const { cartProducts, saveCartToStorage } = get();
    let filteredProducts = cartProducts.filter((p) => p._id !== productId);
    if (cartProducts.length > 1) {
      set((state) => ({
        cartProducts: filteredProducts,
      }));
    } else set(() => ({ cartProducts: [] }));
    saveCartToStorage();
  },
  setActiveCart: () => {
    const { cartState } = get();

    if (cartState === false) {
      let recoveredCart = JSON.parse(window.localStorage.getItem("cart"));
      recoveredCart && set((state) => ({ cartProducts: recoveredCart }));
    }
    set((state) => ({ cartState: state.cartState ? false : true }));
  },
  saveCartToStorage: () => {
    const { cartProducts } = get();
    window.localStorage.setItem("cart", JSON.stringify(cartProducts));
  },
  deleteCartContent: () => {
    set((state) => ({ cartProducts: [] }));
    window.localStorage.setItem("cart", JSON.stringify(""));
  },
  maxPage: () => {
    const { allProducts } = get();
    let max = Math.ceil(allProducts.length / 10);
    set((state) => ({ storeMaxPage: max }));
  },
  handlerNext: () => {
    const { storeMaxPage, storePage } = get();
    if (storeMaxPage > storePage)
      set((state) => ({ storePage: state.storePage + 1 }));
  },
  handlerPrevious: () => {
    const { storePage } = get();
    if (storePage > 1) set((state) => ({ storePage: state.storePage - 1 }));
  },
  totalPrice: 0,
  setTotalPrice: (total) => {
    set((state) => ({ totalPrice: total }));
  },
  // getReviews: async (productId) => {
  //   let response = await axios.get(`/comentariosResenas/${productId}`);
  //   let reviewsToFormat = response.data.forEach((r) => {
  //     const fecha = new Date("2023-04-03T18:17:35.991Z");
  //     const dia = fecha.getUTCDate();
  //     const mes = fecha.getUTCMonth() + 1;
  //     const anio = fecha.getUTCFullYear();
  //     const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
  //       .toString()
  //       .padStart(2, "0")}/${anio.toString()}`;
  //     return (r.fecha = fechaFormateada);
  //   });
  //   set((state) => ({ productReviews: response.data }));
  // },
  sendReview: (obj) => {
    try {
      axios.post("/crearComentarioResena", obj);
      return true
    } catch (err) {
      console.log(err);
    }
  },
  updateStock: async (cartProducts) => {
    let promisifiedUpdate = [];
    cartProducts.forEach((p) => {
      promisifiedUpdate.push(
        axios.get(`/product-detail/${p.id}`).then((response) => {
          console.log("Stock Previo: ", response.data.stock);
          console.log("Cantidad a descontar: ", p.quantity);
          let stock = response.data.stock - p.quantity;
          axios.put(`/stock/${p.id}`, {
            stock: stock,
          });
        })
      );
    });
    await Promise.all(promisifiedUpdate);
  },
}));

export const useModal = create((set) => ({
  modalState: false,
  modalProps: {},
  actionArgs: {},
  modalInfoState: false,
  modalInfoProps: {},
  modalInfoActionArgs: {},
  setModal: (title, text, action, args) => {
    if (title && text && action)
      set((state) => ({ modalProps: { title, text, action } }));
    if (args) set((state) => ({ actionArgs: args }));

    set((state) => ({ modalState: state.modalState ? false : true }));
  },
  setModalInfo: (title, text, action, args) => {
    if (title && text && action)
      set((state) => ({ modalInfoProps: { title, text, action } }));
    if (args) set((state) => ({ modalInfoActionArgs: args }));
    set((state) => ({ modalInfoState: state.modalInfoState ? false : true }));
  },
}));

export const useServices = create((set, get) => ({
  allServices: [],
  filteredServices: [],
  filteredServicesWOSearch: [],
  getServices: async () => {
    try {
      let response = await axios.get("/proveedores");
      let services = response.data;
      set((state) => ({ allServices: services }));
      set((state) => ({ filteredServices: services }));
    } catch (err) {
      console.log(err);
    }
  },
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

export const useUser = create((set, get) => ({
  userInfo: {},
  compras: {},
  getUserInfo: async (id) => {
    let response = await axios.get(`/users/${id}`);
    set((state) => ({ userInfo: response.data }));
  },
}));

export const usePets = create((set, get) => ({
  pets: [],
  selectedPet: {},
  petAddModal: false,
  petDetailModal: false,
  setPetAddModal: () => {
    set((state) => ({ petAddModal: state.petAddModal ? false : true }));
  },
  setPetDetailModal: (petInfo) => {
    if (petInfo) {
      set((state) => ({ selectedPet: petInfo }));
    }
    set((state) => ({ petDetailModal: state.petDetailModal ? false : true }));
  },
  addPet: async (formData, user) => {
    let response = await axios.post(`/mascotas/${user.id}`, formData);
  },
  setPets: (pets) => {
    set((state) => ({ pets: pets }));
  },
}));
