import { create } from "zustand";
import { filterByAnimal } from "../Views/Tienda/helper";

export const useProduct = create((set, get) => ({
  allProducts: [
    {
      id: 1,
      titulo: "Juguete para perros",
      rating: 4.5,
      precio: "3.500",
      categoria: "juguetes",
      animal: "perro",
      imagen:
        "https://mascotaselmolino.com.ar/8836-thickbox_default/juguete-para-perro-20-cm.jpg",
      stock: 3,
    },
    {
      id: 2,
      titulo: "Rascador para gatos",
      rating: 4,
      precio: "1.500",
      categoria: "accesorios",
      animal: "gato",
      imagen: "https://m.media-amazon.com/images/I/514NNA-WuXL._AC_SX466_.jpg",
      stock: 3,
    },
    {
      id: 3,
      titulo: "Alimento para perros",
      rating: 3,
      precio: "2.500",
      categoria: "alimentos",
      animal: "perro",
      imagen:
        "https://itengoo.com/wp-content/uploads/2022/06/Cachorros-10-kg.jpg",
      stock: 3,
    },
    {
      id: 4,
      titulo: "Alimento para gatos",
      rating: 2,
      precio: "2.500",
      categoria: "alimentos",
      animal: "gato",
      imagen:
        "https://costazul.sigo.com.ve/images/thumbs/0012970_alimento-para-gatos-de-carne-whiskas-1-k_450.jpeg",
      stock: 3,
    },
  ],
  filteredProducts: [],
  filteredProductsWOSearch: [],
  getProducts: async () => {
    // revisar cuando esten las rutas
    try {
      let response = await axios.get("/products");
      let products = response.data.data;
      set((state) => ({ allProducts: products }));
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
