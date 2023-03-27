import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
// import { products } from "../../Views/Tienda/helper"
import { useProduct } from "../../hooks/useStore";

const ProductsContainer = () => {
  const [filteredProducts] = useProduct((state) => [state.filteredProducts]);

  return (
    <>
      {typeof filteredProducts === "object" && filteredProducts.length ? (
        filteredProducts.map((product) => {
          return (
            <Link to={`/productos/${product._id}`}>
              <ProductCard
                sku={product._id}
                titulo={product.titulo}
                rating={product.rating}
                precio={product.precio}
                categoria={product.categoria}
                animal={product.animal}
                imagen={product.imagen}
                showAs="Default"
              />
            </Link>
          );
        })
      ) : (
        <p>Lo sentimos, no hay productos con esas características</p>
      )}
    </>
  );
};

export default ProductsContainer;
