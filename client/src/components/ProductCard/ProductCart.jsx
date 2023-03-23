import React from 'react'
import ReactStars from 'react-stars';
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function ProductCart({ showAs, qty, sku }) {

   if(showAs === 'cart'){
      return (
         <>
            <div className='product-cart col-12 d-flex gap-5 p-3'>
               <img src="images/product.jpg" alt="juguete para perro" style={{ width: '100px', height: '100px'}} />
               <div className='d-flex flex-column gap-2'>
                  <h5 className='title mb-0'>Juguete para perro</h5>
                  <p className='sku mb-0'>SKU-809</p>
                  <p className='price mb-0'>AR$ 3.500</p>
               </div>
               <div className='d-flex flex-column'>
                  <h5>Cant</h5>
                  <input className='form-control cant' type="number" />
               </div>
               <div className='d-flex justify-content-center align-items-center'>
                  <button className='button-delete'><RiDeleteBin6Line className='icon-delete'/></button>
               </div>
            </div>
         </>
      )
   }

   return (
         <>
            <div className='product-card col-3 px-3 py-3' >
               <div className='d-flex justify-content-end'>
                  <img style={{ width: '40px' }} src="images/logo-pet.png" alt="logo"></img>
               </div>
               <div className='d-flex justify-content-center product'>
                  <img src="images/product.jpg" alt="juguete para perro" />
               </div>
               <hr />
               <h5>Juguete para perro</h5>
               <ReactStars className='mb-2'
                  count={5}
                  size={20}
                  value={4}
                  edit={true}
                  activeColor="#ffd700"
               />
               <h5>AR$ 3.500</h5>
            </div>
         </>
      )
}
