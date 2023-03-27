export let products = [
  {
    id: 1,
    titulo: "Juguete para perros",
    rating: 4.5,
    precio: "3.500",
    categoria: "juguetes",
    animal: "perro",
    imagen: "https://mascotaselmolino.com.ar/8836-thickbox_default/juguete-para-perro-20-cm.jpg",
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
];

let filteredProducts = [];

export const ordered = (order) => {
  if (order === "alfabetico-ascendente") {
    products.sort((a, b) => {
      if (a.titulo > b.titulo) return 1;
      if (a.titulo < b.titulo) return -1;
      return 0;
    });
  }

  if (order === "alfabetico-descendente") {
    products.sort((a, b) => {
      if (a.titulo < b.titulo) return 1;
      if (a.titulo > b.titulo) return -1;
      return 0;
    });
  }

  if (order === "popularidad") {
    products.sort((a, b) => {
      if (a.rating < b.rating) return 1;
      if (a.rating > b.rating) return -1;
      return 0;
    });
  }
  return products;
};

export const filterByCategory = (categoria) => {
  if (categoria === "all") {
    filteredProducts = products;
  } else {
    const newFilter = products.filter((p) => p.categoria === categoria);
    filteredProducts = newFilter;
  }
  return filteredProducts;
};

export const filterByAnimal = (animal) => {
    if (animal === "all") {
        filteredProducts = products;
      } else {
        filteredProducts = products.filter((p) => p.animal === animal);
      }
      return filteredProducts;
};

export const searchProduct = (titulo) => {
  let result = products.find((p) => p.titulo === titulo);
  products = result;
  return products;
};
