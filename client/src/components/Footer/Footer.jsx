import { Link } from "react-router-dom";
import { AiFillInstagram } from 'react-icons/ai';
import { BsFacebook, BsTwitter, BsTelephone } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import logo from '../../images/logo-pet.png'
import style from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<div className={style.footerWrapper}>
				<div className="container-xxl">
					<div className="row">
						<div className="col-3 py-4">
						<div className="d-flex gap-30">
                                    	<a href="https://www.instagram.com/pets.america/" target="_blank" rel="noopener noreferrer" >
                                        	<button className={style.btnRrss}>
                                            	<AiFillInstagram className={style.iconRrss}/>
                                        	</button>
                                    	</a>

                                    	<a href="https://www.facebook.com/profile.php?id=100091093042920" target="_blank" rel="noopener noreferrer">
                                        	<button className={style.btnRrss}>
                                            	<BsFacebook className={style.iconRrss} />
                                        	</button>
                                    	</a>

                                    	<a href="https://twitter.com/petcareamerica" target="_blank" rel="noopener noreferrer">
                                        	<button className={style.btnRrss}>
                                            	<BsTwitter className={style.iconRrss} />
                                        	</button>
                                    	</a>

                                	{/* <a href="">
                                    		<button className={style.btnRrss}>
                                        		<FaTiktok className={style.iconRrss} />
                                    		</button>
                                		</a> */}
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
								<Link to=""><span className={style.spans}> <HiOutlineLocationMarker className={style.iconContact}/> Ubicacion</span></Link>
								<a className={style.spans} href='tel:584146482412'><BsTelephone className={style.iconContact} /> +58 4146482412</a>
								<a className={style.spans} href='mailto:info@petsamerica.com'><HiOutlineMail className={style.iconContact} /> info@petsamerica.com</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
