import ProductsContainer from '../../components/ProductsContainer/ProductsContainer';
import Meta from '../../components/Meta/Meta';
import BreadCrump from '../../components/BreadCrump/BreadCrump';
import { BiSearchAlt2 } from 'react-icons/bi';
import style from './Tienda.module.css';
import { useState } from 'react';
import { ordered, filterByCategory, filterByType, searchProduct } from './helper';


export default function Tienda() {

   const [ order, setOrder ] = useState('');
   const [ inputSearch, setInputSearch ] = useState('');
   const [ filterCategory, setFilterCategory ] = useState('');
   const [ filterType, setFilterType ] = useState('');
   const [ value, setValue ] = useState(0);

   const handleOnChange = (e) => {
      setValue(e.target.value);
   };

   console.log(inputSearch);

   const handlerInput = (e) => {
      setInputSearch(e.target.value);
   }

   const handlerOrder = (e) => {
      e.preventDefault();
      if (e.target.value) ordered(e.target.value);
      setOrder(e.target.value);
   }

   const handlerFilterByCategory = (e) => {
      e.target.value && filterByCategory(e.target.value);
      setFilterCategory(e.target.value);
   }

   const handlerFilterByType = (e) => {
      e.target.value && filterByType(e.target.value);
      setFilterType(e.target.value);
   }

   const handlerSearchSubmit = (e) => {
      e.preventDefault();
      inputSearch && searchProduct(inputSearch);
      setInputSearch(' ');
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
                              <select value={filterCategory} onChange={(e) => handlerFilterByCategory(e)} class="form-select form-select-lg mb-3" aria-label=".form-select-lg">
                                 <option selected>Categorías</option>
                                 <option value="juguetes">Juguetes</option>
                                 <option value="ropa">Ropa</option>
                                 <option value="accesorios">Accesorios</option>
                                 <option value="aseo">Aseo</option>
                                 <option value="alimentos">Alimentos</option>
                              </select>
                           </div>
                           <div className={`${style.rangePrice} mb-4`}>
                              <label htmlFor="customRange3" className="form-label">Rango de precio</label>
                              <div className='ranges'>
                                 <div className='d-flex flex-column gap-10 justify-content-center'>
                                    <div className='d-flex gap-2'>
                                       <span className={style.prices}>Desde:</span>
                                       <span>AR$ 0</span>
                                    </div>
                                    <div className='d-flex gap-2'>
                                       <span className={style.prices}>Hasta:</span>
                                       <span>AR$ {value}</span>
                                    </div>
                                 </div>
                              </div>
                              <input 
                                 type="range" className="form-range" 
                                 value={value}
                                 onChange={(e) => handleOnChange(e)}
                                 min={0}
                                 max={10000}
                                 step={500} id="customRange3"
                              />
                           </div>
                           <div className='Type-filter'>
                              <select value={filterType} onChange={(e) => handlerFilterByType(e)} class="form-select form-select-lg mb-3" aria-label=".form-select-lg">
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
                                 <select value={order} onChange={(e) => handlerOrder(e)} className='form-control form-select' name="ordenar_por" id="ordenar_por">
                                 <option>Select</option>
                                    <option value="alfabetico-ascendente">Alfabeticamente A-Z</option>
                                    <option value="alfabetico-descendente">Alfabeticamente Z-A</option>
                                    <option value="popularidad">Popularidad</option>
                                 </select>
                              </div>
                              <div className='d-flex align-items-center gap-10'>
                                 <p className='mb-0' style={{ width: "210px"}}>Buscar producto</p>
                                 <input value={inputSearch} onChange={(e) => handlerInput(e)} className='form-control' type="search" name="" id="" />
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
