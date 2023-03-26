import ProductCard from "../ProductCard/ProductCard";
// import { products } from "../../Views/Tienda/helper"
import { useProduct } from "../../hooks/useStore";

const ProductsContainer = () => {
  const [filteredProducts] = useProduct((state) => [state.filteredProducts]);

  return (
    <>
      {filteredProducts.map((product) => {
        return (
          <ProductCard
            sku={product.id}
            titulo={product.titulo}
            rating={product.rating}
            precio={product.precio}
            categoria={product.categoria}
            animal={product.animal}
            imagen={product.imagen}
            showAs="Default"
          />
        );
      })}
    </>
  );
};

export default ProductsContainer;
