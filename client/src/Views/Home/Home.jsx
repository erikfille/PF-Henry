import DarkMode from "../../components/DarkMode/DarkMode";
import style from "./Home.module.css";
import bgPaw from "../../images/bg-paw.png"

const Home = () => {
   return (
      <>
         <div className={`home-wrapper home-wrapper-2 ${style.homeContainer}`}>
            <div className={style.bgImage}>
               <img src={bgPaw} alt="logo=patas" />
            </div>
            <div className={`${style.title} text-center`}>
               <h1 className={style.title1}>Una comunidad de</h1>
               <h2 className={style.title2}>AMOR Y CUIDADO</h2>
            </div>
            <div className={`${style.imgPets} d-flex justify-content-center pt-5 pad-b`}>
               <img src="src/images/pets-img.png" alt="pets" />
            </div>
         </div>
      </>
   )
}

export default Home;
