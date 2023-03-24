import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from "./About.module.css"
import noeliaImg from "../../assets/img/profileNoe.png"; //?  importa la imagen de Noelia
import santiagoImg from "../../assets/img/profileSanti.png"
import agustinImg from "../../assets/img/profilePetri.png"
import jhonImg from "../../assets/img/profileJhon.png"
import erikImg from "../../assets/img/profileErik.png"


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
    <Col xs={6} sm={3} className="d-flex justify-content-around align-items-center mb-3 ">
      <div className="text-center ">
      <img src={imagen} alt="foto persona" className="rounded-circle mb-2 img-fluid w-50"></img>
        <h4>{nombre}</h4>
        <img src={bandera} alt="imagen bandera" className={styles.imgBandera}></img>
        <span className="text-center d-none">{pais}</span>
      </div>
    </Col>
  );
}

export default function About() {
  return (
    <Container className={styles.aboutWrapper}>
      <h1 style={{ textAlign: 'center' }} className="mb-5">¡El equipo detrás de este hermoso proyecto!</h1>

      <Row >
        <Integrante nombre="Noelia Lombardo" pais="Argentina" imagen={noeliaImg}  /> 
        <Integrante nombre="Santiago Arguello" pais="Argentina" imagen={santiagoImg}/>
        <Integrante nombre="Agustin petrini" pais="Argentina" imagen={agustinImg} />
        <Integrante nombre="John Correa" pais="Colombia" imagen={jhonImg} />
      </Row>

      <Row >
        <Integrante nombre="Erik Filleadeau" pais="Argentina" imagen={erikImg} />
        <Integrante nombre="Jonhatan Molero" pais="Venezuela" />
        <Integrante nombre="Maximiliano Herr" pais="Argentina" />
        <Integrante nombre="Ignacio Quirelli" pais="Argentina" />
      </Row>
    </Container>
  );
}

