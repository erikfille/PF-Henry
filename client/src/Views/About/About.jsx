import { useState, useEffect } from 'react';
import { Container as div, Row, Col } from 'react-bootstrap';

import BreadCrump from '../../components/BreadCrump/BreadCrump';
import Meta from "../../components/Meta/Meta";
import styles from "./About.module.css"
import noeliaImg from "../../assets/img/profileNoe.png"; //?  importa la imagen de Noelia
import santiagoImg from "../../assets/img/profileSanti.png"
import agustinImg from "../../assets/img/profilePetri.png"
import jhonImg from "../../assets/img/profileJhon.png"
import erikImg from "../../assets/img/profileErik.png"
import jonhaImg from "../../assets/img/profileJonha.png"
import nachoImg from "../../assets/img/profileNacho.png"
import maxImg from "../../assets/img/profileMax.png"


function Integrante({ nombre, pais, imagen}) {
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
      <Col xs={6} sm={3} className="d-flex justify-content-around align-items-center mb-3  ">
         <div className="text-center">
         <img src={imagen} alt="foto persona" className={`rounded-circle mb-2 img-fluid ${styles.imgPerfil} `}></img>
         <h6 className={styles.name}>{nombre}</h6>
         <img src={bandera} alt="imagen bandera" className={styles.imgBandera}></img>
         <span className="text-center d-none">{pais}</span>
         </div>
      </Col>
   );
}

export default function About() {
   return (
      <>
         <Meta title={"Contacto"} />
         <BreadCrump title='Sobre Nosotros' />
         {/* <div className={` home-wrapper-2 ${styles.aboutContainer}`}> */}
         <div className='home-wrapper-2 col-12 d-flex flex-column align-items-center'>
				<h1 className='fw-bold py-5'>
               ¡El equipo detrás de este hermoso proyecto!
				</h1>
				<div className={`${styles.aboutContainer} col-10 bg-white mb-5 p-5 d-flex flex-column gap-30`}>
               <Row >
                  <Integrante nombre="Noelia Lombardo" pais="Argentina" imagen={noeliaImg} /> 
                  <Integrante nombre="Santiago Arguello" pais="Argentina" imagen={santiagoImg}/>
                  <Integrante nombre="Agustin Petrini" pais="Argentina" imagen={agustinImg} />
                  <Integrante nombre="John Correa" pais="Colombia" imagen={jhonImg} />
               </Row>
               <Row >
                  <Integrante nombre="Erik Filleadeau" pais="Argentina" imagen={erikImg} />
                  <Integrante nombre="Jonathan Molero" pais="Venezuela" imagen={jonhaImg}/>
                  <Integrante nombre="Maximiliano Herr" pais="Argentina" imagen={maxImg}/>
                  <Integrante nombre="Ignacio Quirelli" pais="Argentina" imagen={nachoImg} />
               </Row>
				</div>
			</div>
      </>
   );
}

/*

<div className= "container bg-white rounded-3 py-4 mt-3 mb-3 ">
   <Row >
      <Integrante nombre="Noelia Lombardo" pais="Argentina" imagen={noeliaImg} /> 
      <Integrante nombre="Santiago Arguello" pais="Argentina" imagen={santiagoImg}/>
      <Integrante nombre="Agustin petrini" pais="Argentina" imagen={agustinImg} />
      <Integrante nombre="John Correa" pais="Colombia" imagen={jhonImg} />
   </Row>

   <Row >
      <Integrante nombre="Erik Filleadeau" pais="Argentina" imagen={erikImg} />
      <Integrante nombre="Jonathan Molero" pais="Venezuela" imagen={jonhaImg}/>
      <Integrante nombre="Maximiliano Herr" pais="Argentina" imagen={maxImg}/>
      <Integrante nombre="Ignacio Quirelli" pais="Argentina" imagen={nachoImg} />
   </Row>
</div>

*/

