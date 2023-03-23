import { Link } from 'react-router-dom';


const BreadCrump = (props) => {

   const { title } = props;
   return (
      <div className='breadcrump py-4 mb-0'>
         <div className='container-xxl'>
               <div className='row'>
                  <div className='col-12'>
                     <p className='text-center mb-0'>
                           <Link to="/" className='link-bc text-dark text-decoration-none'>Inicio </Link> / {title}
                     </p>
                  </div>
               </div>
         </div>
      </div>
   )
}

export default BreadCrump;