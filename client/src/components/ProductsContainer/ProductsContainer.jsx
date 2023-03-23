import ProductCard from "../ProductCard/ProductCard"


const ProductsContainer = () => {

   const products = [
      {
         "id": 1,
         "name": 'Juguete para perro',
         "rating": 4.5,
         "price": '3.500',
         "category": 'juguete',
         "type": 'perro',
         "image": "https://mascotaselmolino.com.ar/8836-thickbox_default/juguete-para-perro-20-cm.jpg"
      },
      {
         "id": 2,
         "name": 'Rascador para gato',
         "rating": 4,
         "price": '1.500',
         "category": 'accesorio',
         "type": 'gato',
         "image": 'https://m.media-amazon.com/images/I/514NNA-WuXL._AC_SX466_.jpg'
      },
      {
         "id": 3,
         "name": 'Alimento para perro',
         "rating": 3,
         "price": '2.500',
         "category": 'alimento',
         "type": 'perro',
         "image": 'https://itengoo.com/wp-content/uploads/2022/06/Cachorros-10-kg.jpg'
      },
      {
         "id": 4,
         "name": 'Alimento para gato',
         "rating": 2,
         "price": '2.500',
         "category": 'alimento',
         "type": 'gato',
         "image": 'https://costazul.sigo.com.ve/images/thumbs/0012970_alimento-para-gatos-de-carne-whiskas-1-k_450.jpeg'
      },
   ]

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