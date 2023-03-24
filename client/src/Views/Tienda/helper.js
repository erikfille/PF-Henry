export let products = [
    {
        "id": 1,
        "name": 'Juguete para perros',
        "rating": 4.5,
        "price": '3.500',
        "category": 'juguetes',
        "type": 'perro',
        "image": "https://mascotaselmolino.com.ar/8836-thickbox_default/juguete-para-perro-20-cm.jpg"
    },
    {
        "id": 2,
        "name": 'Rascador para gatos',
        "rating": 4,
        "price": '1.500',
        "category": 'accesorios',
        "type": 'gato',
        "image": 'https://m.media-amazon.com/images/I/514NNA-WuXL._AC_SX466_.jpg'
    },
    {
        "id": 3,
        "name": 'Alimento para perros',
        "rating": 3,
        "price": '2.500',
        "category": 'alimentos',
        "type": 'perro',
        "image": 'https://itengoo.com/wp-content/uploads/2022/06/Cachorros-10-kg.jpg'
    },
    {
        "id": 4,
        "name": 'Alimento para gatos',
        "rating": 2,
        "price": '2.500',
        "category": 'alimentos',
        "type": 'gato',
        "image": 'https://costazul.sigo.com.ve/images/thumbs/0012970_alimento-para-gatos-de-carne-whiskas-1-k_450.jpeg'
    },
]


export const ordered = (order) => {
    if(order === "alfabetico-ascendente"){
        products.sort((a,b) => {
            if(a.name > b.name) return 1;
            if(a.name < b.name) return -1;
            return 0
        });
    }
    
    if (order === "alfabetico-descendente") {
        products.sort((a,b) => {
            if(a.name < b.name) return 1;
            if(a.name > b.name) return -1;
            return 0
        });
    }

    if (order === "popularidad"){
        products.sort((a,b) => {
        if(a.rating < b.rating) return 1;
        if(a.rating > b.rating) return -1;
        return 0
        });
    }
    return products;
}

export const filterByCategory = (category) => {
    const newFilter = products.filter(p => p.category === category);
    products = newFilter;
    return products;
}

export const filterByType = (type) => {
    const newFilter = products.filter(p => p.type === type);
    products = newFilter;
    return products;
}

export const searchProduct = (name) => {
    let result = products.find(p => p.name === name);
    products = result;
    return products;
}