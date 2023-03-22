import React from 'react'
import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div>
        <h1>PetsAmerica</h1>
      </div>

      <div>
        <h4>Menu</h4>
        <span>Sobre Nosotros</span>
        <span>Tienda</span>
        <p>Servicios</p>
        <p>Faqs</p>
        <p>Contacto</p>
      </div>

      <div>
        <h4>Politicas</h4>
        <p>Términos</p>
        <p>Condiciones</p>
      </div>
      
      <div>
        <h4>Nuestro Contacto</h4>
        <p>Ubicación</p>
        <p>Teléfono</p>
        <p>info@petsamerica.com</p>
      </div>  
      
    </div>
  )
}
