import React from 'react';
import { Link } from "react-router-dom";
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle } from 'react-icons/ai';
import { GoLocation, GoMail } from 'react-icons/Go';
import { BsFillTelephoneFill } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Footer.module.css"


export default function Footer() {
  return (
    <div className="container-fluid fixed-bottom " style={{borderTop: "2px solid #0CC5BA"}}> 
      <div className="row">
        <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
          <h1>PetsAmerica</h1>
          <div className="d-flex justify-content-center">
            <Link to="" style={{ color: 'black' }}><AiFillInstagram /></Link>
            <Link to="" style={{ color: 'black' }}><AiFillFacebook /></Link>
            <Link to="" style={{ color: 'black' }}><AiFillTwitterCircle/></Link>
          </div>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2 d-flex flex-column">
          <p style={{ fontWeight: 'bold' }}>Menu</p>
          <Link to="/about" >Sobre Nosotros</Link>
          <Link to="" >Tienda</Link>
          <Link to="" >Servicios</Link>
          <Link to="/faqs" >Faqs</Link>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2 d-flex flex-column gx-2 ">
          <p style={{ fontWeight: 'bold' }}>Politicas</p>
          <Link to="" >Terminos</Link>
          <Link to="" >Condiciones</Link>
        </div>

        <div className="col-lg-2 col-md-2 col-sm-2 d-flex flex-column gx-2">
          <p style={{ fontWeight: 'bold' }}>Nuestro contacto</p>
          <Link to="" ><GoLocation className={styles.contactLink}/>Ubicación</Link>
          <Link to="" ><BsFillTelephoneFill className={styles.contactLink}/>Telefono</Link>
          <Link to="" ><GoMail className={styles.contactLink}/>info@petsamerica.com</Link>
        </div>
      </div>
    </div>
  );
}
