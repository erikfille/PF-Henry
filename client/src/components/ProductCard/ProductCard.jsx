import ReactStars from 'react-stars';
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function ProductCart(props) {

   if(props.showAs === 'cart'){
      return (
         <>
            <div className='product-cart col-12 d-flex gap-5 p-3'>
               <img src={props.image} alt={props.name} style={{ width: '100px', height: '100px'}} />
               <div className='d-flex flex-column gap-2'>
                  <h5 className='title mb-0'>{props.name}</h5>
                  <p className='sku mb-0'>SKU-{props.sku}</p>
                  <p className='price mb-0'>AR$ {props.price}</p>
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
            <div className='product-card col-3,5 px-3 py-3' >
               <div className='d-flex justify-content-end'>
                  <img style={{ width: '40px' }} src="images/logo-pet.png" alt="logo"></img>
               </div>
               <div className='d-flex justify-content-center product'>
                  <img src={props.image} alt="juguete para perro" style={{ width: '170px', height: '170px' }} />
               </div>
               <hr />
               <h5>{props.name}</h5>
               <div className='d-flex align-items-center gap-2 mb-0'>
                  <ReactStars
                     count={5}
                     size={20}
                     value={props.rating}
                     edit={true}
                     activeColor="#ffd700"
                  />
                  <p className='mb-0'>( {props.rating} )</p>
               </div>
               <h5>AR$ {props.price}</h5>
            </div>
         </>
      )
}
