import ProductCard from "../ProductCard/ProductCard"
import { products } from "../../Views/Tienda/helper"

const ProductsContainer = () => {

   return (
      <>
         {
            products.map(product => {
               return <ProductCard
                  sku = {product.id}
                  name = {product.name}
                  rating = {product.rating}
                  price = {product.price}
                  category = {product.category}
                  type = {product.type}
                  image = {product.image}
                  showAs = 'Default'
               />
            })
         }
      </>
   )
}

export default ProductsContainer;