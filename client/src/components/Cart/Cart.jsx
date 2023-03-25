import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../Views/Tienda/helper';
import style from "./Cart.module.css";
import { useState } from 'react';


export default function Cart() {

   const [ isOpen, setIsOpen ] = useState(true);  // El boton de CART del header debe modificar este estado. inicalmente debe estar en False.


   const handlerOnClose = () => { // Esta funcion debe setear el estado en el store a falso.
      setIsOpen(false);
   }
   

   return (
      <>
         <div className={style.shoppingCart} style={{display: isOpen ? 'block' : 'none'}}>

            <div className='d-flex justify-content-end'>
               <button onClick={handlerOnClose} className='button'>Close</button>
            </div>

            <div className={`${style.titleCart} d-flex flex-column align-items-center my-5 gap-2`}>
               <img src="images/logo-pet.png" alt="logo-pet" style={{ width: '30px', height: '30px'}} />
               <h2>Tu Carrito</h2>
            </div>

            <div className={style.imgBg}>
               <img src="images/logo-bg-product.png" alt="img-logo" style={{ width: '430px'}} />
            </div>

            {
               products.length === 0 
               ? <>
                  <div className={`${style.cartEmpty} d-flex flex-column align-items-center py-5`}>
                     <p>Tu carrito esta vacio</p>
                     <a href="#tienda">Ir a la tienda</a>
                  </div>
               </> 
               : <>
                  <div className={style.products}>
                     {
                        products.map((product) => // Aca se mapea los items de cart del store.
                           <ProductCard // y por cada item renderiza una card con el estilo para el carrito.
                              key= {product.id}
                              name = {product.name}
                              sku = {product.id}
                              price = {product.price}
                              image = {product.image}
                              qty = {product.qty}
                              showAs = 'cart'
                           />
                        )
                     }
                  </div>
                  <div className={style.container}>
                     <div className={`${style.totalContainer} mb-5`}>
                        <div className={`${style.total} d-flex justify-content-between mb-2`}>
                           <h6>Total (AR$)</h6>
                           <h6>30.000</h6>
                        </div>
                     </div>
                     <div className='d-flex justify-content-center'>
                        <button className='button'>Confirmar pedido</button>
                     </div>
                  </div>
               </>
            }
         </div>
      </>
   )
}
