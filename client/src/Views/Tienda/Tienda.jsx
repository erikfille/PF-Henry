import ProductCard from '../../components/ProductCard/ProductCart';
import Meta from '../../components/Meta/Meta';
import BreadCrump from '../../components/BreadCrump/BreadCrump';
import { BiSearchAlt2 } from 'react-icons/bi'

export default function Tienda() {
   return (
      <>
         <Meta title={"Tienda"} />
         <BreadCrump title='Tienda' />
         <div className='store-wrapper home-wrapper-2 py-5'>
               <div className='container-xxl'>
                  <div className='row'>
                     <div className='col-3'>
                        <div className='filter-card mb-3 p-3'>
                           <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                              <option selected>Categorias</option>
                              <option value="juguetes">Juguetes</option>
                              <option value="ropa">Ropa</option>
                              <option value="accesorios">Accesorios</option>
                              <option value="aseo">Aseo</option>
                              <option value="alimentos">Alimentos</option>
                           </select>
                           <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                              <option selected>Tipo</option>
                              <option value="juguetes">Perro</option>
                              <option value="ropa">Gato</option>
                              <option value="accesorios">Hamster</option>
                           </select>
                        </div>
                     </div>
                     <div className='col-9'>
                        <div className='filter-sort-grid mb-4 p-2'>
                           <div className='d-flex justify-content-between align-items-center flex-wrap'>
                              <div className='d-flex align-items-center gap-10'>
                                 <p className='mb-0' style={{ width: "150px"}}>Ordenar por:</p>
                                 <select className='form-control form-select' name="ordenar_por" id="ordenar_por">
                                    <option value="alfabetico-ascendente">Alfabeticamente A-Z</option>
                                    <option value="alfabetico-descendente">Alfabeticamente Z-A</option>
                                    <option value="popularidad">Popularidad</option>
                                 </select>
                              </div>
                              <div className='d-flex align-items-center gap-10'>
                                 <p className='mb-0' style={{ width: "210px"}}>Buscar producto</p>
                                 <input className='form-control' type="search" name="" id="" />
                                 <button className='button-search'><i><BiSearchAlt2/></i></button>
                              </div>
                           </div>
                        </div>
                        <div className='product-list pb-5'>
                           <div className='d-flex flex-wrap gap-2'>
                              <ProductCard showAs='Default' />
                              <ProductCard showAs='Default' />
                              <ProductCard showAs='Default' />
                              <ProductCard showAs='Default' />
                              <ProductCard showAs='Default' />
                              <ProductCard showAs='Default' />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
         </div>
      </>
   )
}
