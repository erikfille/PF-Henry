import { Link } from "react-router-dom";
import { AiFillInstagram } from 'react-icons/ai';
import { BsFacebook, BsTwitter, BsTelephone } from 'react-icons/bs';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import logo from '../../images/logo-pet.png'
import style from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<div className={style.footerWrapper}>
				<div className="container-xxl">
					<div className="row">
						<div className="col-3 py-4 d-flex flex-column align-items-center gap-30 mt-2">
							<div>
								<img src={logo} alt="logo" style={{width: "100px"}} />
							</div>
							<div className="d-flex gap-30">

								<Link to="https://www.instagram.com/pets.america/" target="_blank" rel="noopener noreferrer" >
									<button className={style.btnRrss}>
										<AiFillInstagram className={style.iconRrss}/>
									</button>
								</Link>

								<Link to="https://www.facebook.com/profile.php?id=100091093042920" target="_blank" rel="noopener noreferrer">
									<button className={style.btnRrss}>
										<BsFacebook className={style.iconRrss} />
									</button>
								</Link>

								<Link to="https://twitter.com/petcareamerica" target="_blank" rel="noopener noreferrer">
									<button className={style.btnRrss}>
										<BsTwitter className={style.iconRrss} />
									</button>
								</Link>
							</div>
						</div>
						<div className="col-3 py-4 text-center">
							<div className="policy d-flex flex-column justify-content-center gap-10">
								<h4 className={`${style.h4} mb-4`}>Menú</h4>
								<Link to="/contacto"><span className={style.spans}>Contacto</span></Link>
								<Link to="/faqs"><span className={style.spans}>Faqs</span></Link>
								<Link to="/about"><span className={style.spans}>Sobre Nosotros</span></Link>
							</div>
						</div>
						<div className="col-3 py-4 text-center">
							<div className="policy d-flex flex-column justify-content-center gap-10">
								<h4 className={`${style.h4} mb-4`}>Políticas</h4>
								<Link to="/terminos"><span className={style.spans}>Términos y Condiciones</span></Link>
							</div>
						</div>
						<div className="col-3 py-4 text-center">
							<div className="contact d-flex flex-column justify-content-center gap-10">
								<h4 className={`${style.h4} mb-4`}>Nuestro Contacto</h4>
								<Link to="/ubicacion"><span className={style.spans}> <HiOutlineLocationMarker className={style.iconContact}/> Ubicacion</span></Link>
								<Link className={style.spans} to='tel:584146482412'><BsTelephone className={style.iconContact} /> +58 4146482412</Link>
								<Link className={style.spans} to='mailto:info@petsamerica.com'><HiOutlineMail className={style.iconContact} /> info@petsamerica.com</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
