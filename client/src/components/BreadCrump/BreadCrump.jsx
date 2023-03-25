import { Link } from 'react-router-dom';
import style from './BreadCrump.module.css'


const BreadCrump = (props) => {

   const { title } = props;
   return (
      <div className={`${style.breadcrump} py-2`}>
         <div className='container-xxl'>
               <div className='row'>
                  <div className='col-12'>
                     <p className='text-center mb-0'>
                           <Link to="/" className={`${style.link} text-dark text-decoration-none`}>Inicio </Link> / {title}
                     </p>
                  </div>
               </div>
         </div>
      </div>
   )
}

export default BreadCrump;