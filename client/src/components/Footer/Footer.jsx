import { Link } from "react-router-dom";
import { AiFillInstagram } from 'react-icons/ai';
import { BsFacebook, BsTwitter, BsTelephone } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi'

export default function Footer() {
	return (
		<>
			<div className="footer-wrapper">
				<div className="container-xxl">
					<div className="row">
						<div className="col-3 py-5">
							<div className="title d-flex flex-column justify-content-center gap-10">
								<h2>PetsAmerica</h2>
								<img src="images/logo-pet.png" alt="logo" style={{ width: '180px', height: "180px"}} className="mb-3" />
								<div className="rrss-footer d-flex gap-30">
									<button className="btn-rrss"><AiFillInstagram className="icon-rrss" /></button>
									<button className="btn-rrss"><BsFacebook className="icon-rrss" /></button>
									<button className="btn-rrss"><FaTiktok className="icon-rrss" /></button>
									<button className="btn-rrss"><BsTwitter className="icon-rrss" /></button>
								</div>
							</div>
						</div>
						<div className="col-3 py-5 text-center">
							<div className="policy d-flex flex-column justify-content-center gap-30">
								<h4>Políticas</h4>
								<Link to=""><span className="spans">Términos</span></Link>
								<Link to=""><span className="spans">Condiciones</span></Link>
							</div>
						</div>
						<div className="col-3 py-5">
							<div className="contact d-flex flex-column justify-content-center gap-30">
								<h4>Nuestro Contacto</h4>
								<Link to=""><span className="spans"> <HiOutlineLocationMarker className="icon-contact"/> Ubicacion</span></Link>
								<a className="spans" href='tel:584146482412'><BsTelephone className="icon-contact" /> +58 4146482412</a>
								<a className="spans" href='mailto:info@petsamerica.com'><HiOutlineMail className="icon-contact" /> info@petsamerica.com</a>
							</div>
						</div>
						<div className="col-3 d-flex flex-column justify-content-end">
							<img className="img-cat" src="images/cat-footer.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
