import style from './PetData.module.css';
import { TbPawFilled } from 'react-icons/tb'

const PetData = (props) => {
   return (
      <>
         <div className={`${style.pet} d-flex gap-80`}>
            <div className='d-flex flex-column align-items-center gap-3'>
               <div className={style.circle}>
                  <TbPawFilled style={{ width: "80px", height: "80px" }} />
               </div>
               <a href="#" className={style.info}>Editar</a>
            </div>
            <div className={style.detail}>
               <p className={`${style.name} mb-0`}>{props.name}</p>
               <p className={`${style.especie} mb-0`}>{props.especie}</p>
               <p className={`${style.nac} mb-0`}>{props.nac}</p>
               <a href="#" className={style.info}>+ Información</a>
            </div>
         </div>
      </>
   )
}

export default PetData;
