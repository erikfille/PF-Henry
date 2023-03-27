import ProductCard from "../ProductCard/ProductCard";
// import { products } from "../../Views/Tienda/helper"
import { useProduct } from "../../hooks/useStore";

const ProductsContainer = () => {
  const [filteredProducts] = useProduct((state) => [state.filteredProducts]);

  return (
    <>
      {(typeof filteredProducts === "object" && filteredProducts.length) ? (
        filteredProducts.map((product) => {
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
        })
      ) : (
        <p>Lo sentimos, no hay productos con esas características</p>
      )}
    </>
  );
};

export default ProductsContainer;
