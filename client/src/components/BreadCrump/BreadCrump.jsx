import { Link } from 'react-router-dom';
import style from './BreadCrump.module.css'


const BreadCrump = (props) => {

   const { title } = props;
   return (
      <div className={`${style.breadcrump} py-2`}>
         <div className='container-xxl'>
               <div className='row'>
                  <div className='col-12 d-flex justify-content-center align-items-center'>
                     <Link to="/" className={`${style.link} text-decoration-none`}>Inicio&nbsp;</Link>
                     <p className={`${style.p} mb-0`}>/ {title}</p>
                  </div>
               </div>
         </div>
      </div>
   )
}

export default BreadCrump;