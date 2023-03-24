import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import Meta from '../../components/Meta/Meta';
import BreadCrump from '../../components/BreadCrump/BreadCrump';
import { BiSearchAlt2 } from 'react-icons/bi';
import style from './Tienda.module.css';
import { useState } from 'react';
import { ordered, filterByCategory, filterByType, searchProduct } from './helper';


export default function Tienda() {

   const [ order1, setOrder1 ] = useState('');
   const [ order2, setOrder2 ] = useState('');
   const [ order3, setOrder3 ] = useState('');
   const [ order4, setOrder4 ] = useState('');

   console.log(order2);

   const handlerInput = (e) => {
      setOrder2(e.target.value);
   }

   const handlerOrder = (e) => {
      e.preventDefault();
      if (e.target.value) ordered(e.target.value);
      setOrder1(e.target.value);
   }

   const handlerFilterByCategory = (e) => {
      e.target.value && filterByCategory(e.target.value);
      setOrder3(e.target.value)
   }

   const handlerFilterByType = (e) => {
      e.target.value && filterByType(e.target.value);
      setOrder4(e.target.value)
   }

   const handlerSearchSubmit = (e) => {
      e.preventDefault();
      order2 && searchProduct(order2);
      setOrder2(' ');
   }

   return (
      <>
         <Meta title={"Tienda"} />
         <BreadCrump title='Tienda' />
         <div className='store-wrapper home-wrapper-2 py-5'>
               <div className='container-xxl'>
                  <div className='row'>
                     <div className='col-3'>
                        <div className={`${style.filterCard} mb-3 p-3`}>
                           <div className='Category-filter mb-4'>
                              <select value={order3} onChange={(e) => handlerFilterByCategory(e)} class="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                                 <option selected>Categorías</option>
                                 <option value="juguetes">Juguetes</option>
                                 <option value="ropa">Ropa</option>
                                 <option value="accesorios">Accesorios</option>
                                 <option value="aseo">Aseo</option>
                                 <option value="alimentos">Alimentos</option>
                              </select>
                           </div>
                           <div className='Type-filter'>
                              <select value={order4} onChange={(e) => handlerFilterByType(e)} class="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                                 <option selected>Tipo</option>
                                 <option value="perro">Perro</option>
                                 <option value="gato">Gato</option>
                                 <option value="hamster">Hamster</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className='col-9'>
                        <div className={`${style.filterSortGrid} mb-4 p-2`}>
                           <div className='d-flex justify-content-between align-items-center flex-wrap'>
                              <div className='d-flex align-items-center gap-10'>
                                 <p className='mb-0' style={{ width: "150px"}}>Ordenar por:</p>
                                 <select value={order1} onChange={(e) => handlerOrder(e)} className='form-control form-select' name="ordenar_por" id="ordenar_por">
                                 <option>Select</option>
                                    <option value="alfabetico-ascendente">Alfabeticamente A-Z</option>
                                    <option value="alfabetico-descendente">Alfabeticamente Z-A</option>
                                    <option value="popularidad">Popularidad</option>
                                 </select>
                              </div>
                              <div className='d-flex align-items-center gap-10'>
                                 <p className='mb-0' style={{ width: "210px"}}>Buscar producto</p>
                                 <input value={order2} onChange={(e) => handlerInput(e)} className='form-control' type="search" name="" id="" />
                                 <button className={style.buttonSearch} onClick={(e) => handlerSearchSubmit(e)}><i><BiSearchAlt2 className={style.iconSearch}/></i></button>
                              </div>
                           </div>
                        </div>
                        <div className='product-list pb-5'>
                           <div className='d-flex flex-wrap gap-2'>
                              <ProductsContainer />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
         </div>
      </>
   )
}
