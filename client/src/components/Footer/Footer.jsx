import { Link } from "react-router-dom";
import { AiFillInstagram } from 'react-icons/ai';
import { BsFacebook, BsTwitter, BsTelephone } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import style from './Footer.module.css';

export default function Footer() {
	return (
		<>
			<div className={style.footerWrapper}>
				<div className="container-xxl">
					<div className="row">
						<div className="col-3 py-5">
							<div className={`${style.title} d-flex flex-column justify-content-center gap-10`}>
								<h2>PetsAmerica</h2>
								<img src="images/logo-pet.png" alt="logo" style={{ width: '180px', height: "180px"}} className="mb-3" />
								<div className="d-flex gap-30">
									<button className={style.btnRrss}><AiFillInstagram className={style.iconRrss} /></button>
									<button className={style.btnRrss}><BsFacebook className={style.iconRrss} /></button>
									<button className={style.btnRrss}><FaTiktok className={style.iconRrss} /></button>
									<button className={style.btnRrss}><BsTwitter className={style.iconRrss} /></button>
								</div>
							</div>
						</div>
						<div className="col-3 py-5 text-center">
							<div className="policy d-flex flex-column justify-content-center gap-30">
								<h4>Políticas</h4>
								<Link to=""><span className={style.spans}>Términos y Condiciones</span></Link>
							</div>
						</div>
						<div className="col-3 py-5">
							<div className="contact d-flex flex-column justify-content-center gap-30">
								<h4>Nuestro Contacto</h4>
								<Link to=""><span className={style.spans}> <HiOutlineLocationMarker className={style.iconContact}/> Ubicacion</span></Link>
								<a className={style.spans} href='tel:584146482412'><BsTelephone className={style.iconContact} /> +58 4146482412</a>
								<a className={style.spans} href='mailto:info@petsamerica.com'><HiOutlineMail className={style.iconContact} /> info@petsamerica.com</a>
							</div>
						</div>
						<div className="col-3 d-flex flex-column justify-content-end">
							<img className={style.imgCat} src="images/cat-footer.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
