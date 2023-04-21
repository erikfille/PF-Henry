import React, {useState, useEffect} from 'react'

import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";

import styles from "./Ubicacion.module.css";


function Bandera({ pais}) {
    const [bandera, setBandera] = useState('');
 
    useEffect(() => {
       const fetchBandera = async () => {
          const res = await fetch(`https://restcountries.com/v2/name/${pais}`);
          const data = await res.json();
          if (data.length > 0) {
          setBandera(data[0].flag);
          }
       };
       fetchBandera();
    }, [pais]);
 
    return (
        <div>
            <img src={bandera} alt="imagen bandera" className={styles.imgBandera} />
        </div>
    );
 }


 export default function Ubicacion() {

    return (
      <div> 
        <Meta title={"Ubicaicon"} />
        <BreadCrump title="Ubicación" />
        <div className="container-xxl home-wrapper-2 col-12 d-flex flex-column align-items-center">
          <div>
            <h1 className={`${styles.h1} fw-bold py-5 text-center mx-5`}>Encuentra tu oficina comercial más cercana</h1>
          </div> 
          <div className={`${styles.aboutContainer} col-10 mb-5 p-5 d-flex flex-column gap-30`}>
            <div className="row">

                
                <div className="col">
                    <Bandera pais="Argentina" />
                        <span>La Plata</span>
                        <p>La casa de Erik</p>
                    
                        <span>Bueno Aires</span>
                        <p>La casa de Noe</p>
                
                        <span>Arroyo Seco</span>
                        <p>La casa de Agus</p>
                
                        <span>Córdoba</span>
                        <p>La casa de Santi</p>

                        <span>Villa Regina</span>
                        <p>La casa de Max</p>
                </div>
              
                <div className="col-6 col-sm-3">
                    <Bandera ciudad="Medellín" pais="Colombia"/>
                        <span>Medellín</span>    
                        <p>La casa de Jhon</p> 
                </div>
                
                <div className="col-6 col-sm-3">
                    <Bandera ciudad="Maracaibo" pais="Venezuela"/>
                        <span>Maracaibo</span>   
                        <p>La casa de Jona</p> 
                </div>
                
                <div className="col-6 col-sm-3">
                    <Bandera ciudad="España" pais="España"/>
                        <span>España</span>    
                        <p>La casa de Nacho en Madrid</p> 
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }