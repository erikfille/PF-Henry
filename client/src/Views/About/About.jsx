import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styles from "./About.module.css"

function Integrante({ nombre, pais }) {
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
    <Col xs={6} sm={3} className="d-flex justify-content-center align-items-center">
    <div className="text-center">
      <img src="" alt="foto persona" className="rounded-circle mb-2"></img>
      <p>{nombre}</p>
      <img src={bandera} alt="imagen bandera" className={styles.imgBandera}></img>
      <span className="text-center d-none">{pais}</span>
    </div>
  </Col>
);
}

export default function About() {
  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}>¡El equipo detrás de este hermoso proyecto!</h2>

      <Row >
        <Integrante nombre="Noelia" pais="Argentina" />
        <Integrante nombre="Jhon Tatto" pais="Colombia" />
        <Integrante nombre="Jonha" pais="Venezuela" />
        <Integrante nombre="Santi" pais="Argentina" />
      </Row>

      <Row >
        <Integrante nombre="Integrante 5" pais="Chile" />
        <Integrante nombre="Integrante 6" pais="México" />
        <Integrante nombre="Integrante 7" pais="Perú" />
        <Integrante nombre="Integrante 8" pais="Uruguay" />
      </Row>
    </Container>
  );
}

