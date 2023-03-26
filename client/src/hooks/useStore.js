import { create } from "zustand";

export const useProduct = create((set) => ({
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
  filteredProducts: [
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
  filter: {
    categoria: "all",
    animal: "all",
  },
  getProducts: async () => {
    // revisar cuando esten las rutas
    try {
      let response = await axios.get("/products");
      let products = response.data.data;
      set((state) => ({ allProducts: products }));
      set((state) => ({ filteredProducts: products }));
    } catch (err) {
      console.log(err);
    }
  },
  setFilter: (key, value) => {
    set((state) => ({ ...state, filter: { ...state.filter, [key]: value } }))
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
  filterByCategory: (categoria) => {
    if (categoria === "all") {
      if (filter.animal === "all")
        set((state) => ({ filteredProducts: state.allProducts }));
      if (filter.animal !== "all") {
        let preFiltered = allProducts.filter((p) => p.animal === filter.animal);
        set((state) => ({ filteredProducts: preFiltered }));
      }
    } else {
      set((state) => ({
        filteredProducts: state.filteredProducts.filter(
          (p) => p.categoria === categoria
        ),
      }));
    }
  },
  filterByAnimal: (animal) => {
    if (animal === "all") {
      if (filter.categoria === "all")
        set((state) => ({ filteredProducts: state.allProducts }));
      if (filter.categoria !== "all") {
        let preFiltered = allProducts.filter((p) => p.categoria === filter.categoria);
        set((state) => ({ filteredProducts: preFiltered }));
      }
    } else {
      set((state) => ({
        filteredProducts: state.filteredProducts.filter(
          (p) => p.animal === animal
        ),
      }));
    }
  },
  searchProduct: (titulo) => {
    let result = allProducts.find((p) => p.titulo === titulo);
    set((state) => ({ filteredProducts: result }));
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
