//? React
import React from "react";
import { Link } from "react-router-dom";

//? styles
import styles from "./Footer.module.css";
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai";
import { GoLocation, GoMail } from "react-icons/go";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {
	return (
		<div className={styles.footerContainer}>
			<div>
				<h1>PetsAmerica</h1>
				<div className={styles.containerRedes}>
					<Link to='' className={styles.redesLink}>
						<AiFillInstagram />
					</Link>

					<Link to='' className={styles.redesLink}>
						<AiFillFacebook />
					</Link>

					<Link to='' className={styles.redesLink}>
						<AiFillTwitterCircle />
					</Link>
				</div>
			</div>

			{/* //Todo: definir las rutas a donde linkea todo */}

			<div className={styles.containerLinks}>
				<p>Menu</p>
				<Link to='/about' className={styles.footerLink}>
					Sobre Nosotros
				</Link>
				<Link to='' className={styles.footerLink}>
					Tienda
				</Link>
				<Link to='' className={styles.footerLink}>
					Servicios
				</Link>
				<Link to='/faqs' className={styles.footerLink}>
					Faqs
				</Link>
				<Link to='' className={styles.footerLink}>
					Contacto
				</Link>
			</div>

			<div className={styles.containerLinks}>
				<p>Politicas</p>
				<Link to='' className={styles.footerLink}>
					Terminos
				</Link>
				<Link to='' className={styles.footerLink}>
					Condiciones
				</Link>
			</div>

			<div className={styles.containerLinks}>
				<p>Nuestro contacto</p>
				<Link to='' className={styles.footerLink}>
					<GoLocation className={styles.contactLink} />
					Ubicación
				</Link>
				<Link to='' className={styles.footerLink}>
					<BsFillTelephoneFill className={styles.contactLink} />
					Telefono
				</Link>
				<Link to='' className={styles.footerLink}>
					<GoMail className={styles.contactLink} />
					info@petsamerica.com
				</Link>
			</div>
		</div>
	);
}
