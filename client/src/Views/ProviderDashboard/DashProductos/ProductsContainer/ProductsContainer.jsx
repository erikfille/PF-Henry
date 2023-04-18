import React from 'react';
import ProductProviderCard from './ProductCard/ProductProviderCard';

// Productos hard
import {Products} from "../../helpers/Products";

const ProductsContainer = () => {

	return (
		<>
			{
			Products.map((product) => { return (
            <ProductProviderCard
				titulo={product.titulo}
				precio={product.precio}
				imagen={product.imagen}
				cantidad={product.stock}
            />
			);})}
		</>
	);
}

export default ProductsContainer;