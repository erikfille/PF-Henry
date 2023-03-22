import { create } from "zustand";

const useProduct = create((set) => ({
  allProducts: [],
  filteredProducts: [],
  getProducts: async () => {
    // revisar cuando esten las rutas
    try {
      let response = await axios.get("/products");
      let allProducts = response.data.data;
      set((state) => ({ allProducts: allProducts }));
      set((state) => ({ filteredProducts: allProducts }));
    } catch (err) {
      console.log(err);
    }
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
