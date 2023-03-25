export let services = [
    {
        "id": 1,
        "title": 'Clinica Veterinaria',
        "service": 'Clinica',
        "country": 'Argentina',
        "address": "Av. Calle. Local",
        "image": "images/service-img.jpg"
    },
    {
        "id": 2,
        "title": 'Spa Pets America',
        "service": 'Spa',
        "country": 'Venezuela',
        "address": "Av. Calle. Local",
        "image": "images/service-img.jpg"
    },
    {
        "id": 3,
        "title": 'Cuidados The Garden',
        "service": 'Hogar',
        "country": 'Colombia',
        "address": "Av. Calle. Local",
        "image": "images/service-img.jpg"
    },
    {
        "id": 4,
        "title": 'Paseos Best Friends',
        "service": 'Paseo',
        "country": 'Argentina',
        "address": "Av. Calle. Local",
        "image": "images/service-img.jpg"
    },
]

export const ordered = (order) => {
    if(order === "alfabetico-ascendente"){
        services.sort((a,b) => {
            if(a.title > b.title) return 1;
            if(a.title < b.title) return -1;
            return 0
        });
    }
    
    if (order === "alfabetico-descendente") {
        services.sort((a,b) => {
            if(a.title < b.title) return 1;
            if(a.title > b.title) return -1;
            return 0
        });
    }
    return services;
}

export const filterByService = (service) => {
    const newFilter = services.filter(s => s.service === service);
    services = newFilter;
    return services;
}

export const filterByLocation = (country) => {
    const newFilter = services.filter(p => p.country === country);
    services = newFilter;
    return services;
}

export const searchService = (name) => {
    let result = services.find(p => p.name === name);
    services = result;
    return services;
}