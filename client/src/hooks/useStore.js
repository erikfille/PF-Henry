import { create } from "zustand";
import axios from "axios";

export const useProduct = create((set, get) => ({
  allProducts: [],
  filteredProducts: [],
  filteredProductsWOSearch: [],
  categories: [],
  filteredCategories: [],
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
      let filtrarCategoriasActivas = response.data.categorias.filter(
        (c) => c.status === 1
      );
      let categorias = [
        ...new Set(filtrarCategoriasActivas.map((c) => c.nombre)),
      ];
      set((state) => ({ categories: categorias }));
      set((state) => ({ filteredCategories: categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  getSpecies: async () => {
    try {
      let response = await axios.get("/especies");
      let especies = response.data.filter((s) => s.status === 1);
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
  sendReview: (obj) => {
    try {
      axios.post("/crearComentarioResena", obj);
      return true;
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
    try {
      let response = await axios.get(`/users/${id}`);
      set((state) => ({ userInfo: response.data }));
    } catch (error) {
      window.alert("No se encontró el usuario");
    }
  },
  getCompras: async (id) => {
    try {
      let response = await axios.get(`/compras/${id}`);
      set((state) => ({ compras: response.data }));
    } catch (error) {
      window.alert("No se encontraron las compras del usuario");
    }
  },
}));

export const usePets = create((set, get) => ({
  pets: [],
  selectedPet: {},
  petAddModal: false,
  petDetailModal: false,
  petHistory: [],
  setPetAddModal: () =>
    set((state) => ({ petAddModal: state.petAddModal ? false : true })),
  setPetDetailModal: (petInfo) => {
    if (petInfo) {
      set((state) => ({ selectedPet: petInfo }));
    }
    set((state) => ({ petDetailModal: state.petDetailModal ? false : true }));
  },
  addPet: async (formData, user) => {
    try {
      let response = await axios.post(`/mascotas/${user.id}`, formData);
    } catch (err) {
      console.log(err);
    }
  },
  setPets: (pets) => {
    set((state) => ({ pets: pets }));
  },
  getHistory: async (petId) => {
    try {
      let response = await axios.get(`/historial/${petId}`);
      set((state) => ({ petHistory: response.data }));
    } catch (err) {
      console.log(err);
    }
  },
  addNewHistory: async (newHistory, petId) => {
    try {
      let response = await axios.post(`/historial/${petId}`, newHistory);
    } catch (err) {
      console.log(err);
    }
  },
}));

export const useAdmin = create((set, get) => ({
  adminCategories: [],
  selectedCategory: "",
  adminFilteredCategories: [],
  categoryEditModal: false,
  adminSpecies: [],
  adminFilteredSpecies: [],
  selectedSpecie: "",
  speciesEditModal: false,
  adminUsers: [],
  adminFilteredUsers: [],
  adminFilteredUsersWOSearch: [],
  selectedUser: {},
  userBuyedProducts: [],
  usersEditModal: false,
  usersDetailModal: false,
  adminProducts: [],
  adminFilteredProducts: [],
  selectedProducts: {},
  productsEditModal: false,
  adminProviders: [],
  adminFilteredProviders: [],
  adminFilteredProvidersWOSearch: [],
  selectedProvider: {},
  providersEditModal: false,
  getAdminCategories: async () => {
    try {
      let response = await axios.get("/categorias");
      set((state) => ({ adminCategories: response.data.categorias }));
      set((state) => ({ adminFilteredCategories: response.data.categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  getAdminSpecies: async () => {
    try {
      let response = await axios.get("/especies");
      let species = response.data;
      set((state) => ({ adminSpecies: species }));
      set((state) => ({ adminFilteredSpecies: response.data }));
    } catch (err) {
      console.log(err);
    }
  },
  searchAdminCategories: (categories) => {
    if (typeof categories === "object") {
      set((state) => ({ adminFilteredCategories: categories }));
    }
  },
  searchAdminSpecies: (species) => {
    if (typeof species === "object") {
      set((state) => ({ adminFilteredSpecies: species }));
    }
  },
  addCategory: async (newCategory) => {
    const { getAdminCategories } = get();
    try {
      await axios.post("/crearCategoria", newCategory);
      await getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  addSpecie: (specie) => {
    const { getAdminSpecies } = get();
    try {
      axios.post("/especies", { animal: specie });
      getAdminSpecies();
    } catch (err) {
      console.log(err);
    }
  },
  categoryChangeStatus: async (id, newItem) => {
    const { getAdminCategories } = get();
    try {
      let response = await axios.put(`/categorias/status/${id}`, newItem);
      getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  specieChangeStatus: async (id, newItem) => {
    const { getAdminSpecies } = get();
    try {
      await axios.put(`/especies/status/${id}`, newItem);
      await getAdminSpecies();
    } catch (err) {
      console.log(err);
    }
  },
  setCategoryEditModal: (cat) => {
    const { categoryEditModal } = get();
    if (cat) {
      set((state) => ({ selectedCategory: cat }));
    }
    set((state) => ({ categoryEditModal: categoryEditModal ? false : true }));
  },
  editCategory: async (id, editedCategory) => {
    const { setCategoryEditModal, getAdminCategories } = get();
    try {
      let response = await axios.put(
        `/categorias/status/${id}`,
        editedCategory
      );
      setCategoryEditModal();
      await getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  editSpecie: async (id, editedSpecie) => {
    const { setSpecieEditModal, getAdminSpecies } = get();
    try {
      let response = await axios.put(`/especies/status/${id}`, editedSpecie);
      setSpecieEditModal();
      await getAdminSpecies();
    } catch (err) {
      console.log(err);
    }
  },
  setSpecieEditModal: (specie) => {
    if (specie) {
      set((state) => ({ selectedSpecie: specie }));
    }
    set((state) => ({
      speciesEditModal: state.speciesEditModal ? false : true,
    }));
  },
  getAdminUsers: async () => {
    try {
      let response = await axios.get("/users");
      response.data.forEach((u) => {
        u.name = `${u.name[0].toUpperCase()}${u.name.slice(1)}`;
        u.surname = `${u.surname[0].toUpperCase()}${u.surname.slice(1)}`;
      });
      set((state) => ({ adminUsers: response.data }));
      set((state) => ({ adminFilteredUsers: response.data }));
      set((state) => ({ adminFilteredWOSUsers: response.data }));
    } catch (err) {
      console.log(err);
    }
  },
  searchAdminUsers: (users) => {
    if (typeof users === "object") {
      set((state) => ({ adminFilteredUsers: users }));
    }
  },
  modifyUser: async (newUser) => {
    const { getAdminUsers } = get();
    try {
      // console.log(newUser);
      // await axios.post("/crearCategoria", newUser);
      // await getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  setUserEditModal: async (userId) => {
    if (userId) {
      let response = await axios.get(`users/${userId}`);
      set((state) => ({ selectedUser: response.data }));
    }
    set((state) => ({ userEditModal: state.userEditModal ? false : true }));
  },
  setUserDetailModal: async (userId) => {
    if (userId) {
      let response = await axios.get(`users/${userId}`);
      response.data.name = `${response.data.name[0].toUpperCase()}${response.data.name.slice(
        1
      )}`;
      response.data.surname = `${response.data.surname[0].toUpperCase()}${response.data.surname.slice(
        1
      )}`;
      set((state) => ({ selectedUser: response.data }));

      let promisifiedProducts = [];
      let buyedProducts = [];
      response.data.productosComprados.forEach((p) => {
        promisifiedProducts.push(
          axios.get(`/product-detail/${p._id}`).then((response) => {
            buyedProducts.push(response.data);
          })
        );
      });
      Promise.all(promisifiedProducts)
        .then(() => {
          set((state) => ({ userBuyedProducts: buyedProducts }));
        })
        .catch((e) => {
          console.log(e);
        });
    }
    set((state) => ({ usersEditModal: state.usersEditModal ? false : true }));
  },
  userChangeStatus: async (id, newUser) => {
    const { getAdminUsers } = get();
    try {
      await axios.put(`/users/${id}`, newUser);
      await getAdminUsers();
    } catch (err) {
      console.log(err);
    }
  },
  getAdminProducts: async () => {
    try {
      // let response = await axios.get("/categorias");
      // set((state) => ({ adminCategories: response.data.categorias }));
      // set((state) => ({ adminFilteredCategories: response.data.categorias }));
    } catch (err) {
      console.log(err);
    }
  },
  searchAdminProducts: (users) => {
    if (typeof users === "object") {
      set((state) => ({ adminFilteredUsers: users }));
    }
  },
  modifyProducts: async (newUser) => {
    const { getAdminUsers } = get();
    try {
      // console.log(newUser);
      // await axios.post("/crearCategoria", newUser);
      // await getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  productsChangeStatus: async (id, newUser) => {
    const { getAdminUsers } = get();
    try {
      // await axios.put(`/especies/status/${id}`, newUser);
      // await getAdminUsers();
    } catch (err) {
      console.log(err);
    }
  },
  getAdminProviders: async () => {
    try {
      let response = await axios.get("/proveedores");
      set((state) => ({ adminProviders: response.data }));
      set((state) => ({ adminFilteredProviders: response.data }));
      set((state) => ({ adminFilteredProvidersWOSearch: response.data }));
    } catch (err) {
      console.log(err);
    }
  },
  searchAdminProviders: (users) => {
    if (typeof users === "object") {
      set((state) => ({ adminFilteredProviders: users }));
    }
  },
  filterAdminProviders: (users) => {
    if (typeof users === "object") {
      set((state) => ({ adminFilteredProvidersWOSearch: users }));
    }
  },
  modifyProvider: async (newUser) => {
    const { getAdminProviders } = get();
    try {
      // console.log(newUser);
      // await axios.post("/crearCategoria", newUser);
      // await getAdminCategories();
    } catch (err) {
      console.log(err);
    }
  },
  providerChangeStatus: async (id, newUser) => {
    const { getAdminProviders } = get();
    try {
      // await axios.put(`/proveedor/${id}`, newUser);
      // await getAdminProviders();
    } catch (err) {
      console.log(err);
    }
  },
}));
