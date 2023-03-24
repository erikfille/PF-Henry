import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./About.module.css"

export default function About() {
  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}>¡El equipo detrás de este hermoso proyecto!</h2>

      <Row>
        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

        <Col xs={6} sm={3}>
          <div className="d-flex flex-column align-items-center">
            <img src="" alt="foto persona" className="rounded-circle"></img>
            <p>Nombre integrante</p>
            <img src="" alt="imagen bandera"></img>
          </div>
        </Col>

      </Row>

    </Container>
  )
}

