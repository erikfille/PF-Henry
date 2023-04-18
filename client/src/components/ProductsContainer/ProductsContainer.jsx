import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

const ProductsContainer = ({ product }) => {
  return (
    <>
      {typeof product === "object" && product.length ? (
        product.map((product) => {
          return (
            <Link key={product._id} to={`/productos/${product._id}`}>
              <ProductCard
                key={product._id}
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
