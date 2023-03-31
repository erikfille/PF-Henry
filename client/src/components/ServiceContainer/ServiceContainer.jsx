import { useServices } from "../../hooks/useStore";
import ServiceCard from "../ServiceCard/ServiceCard";
<<<<<<< HEAD
import servicesImage from "../../../public/images/service-img.jpg";
import Loader from "../Loader/Loader";
=======
import servicesImage from '../../../public/images/service-img.jpg'
import Loader from '../Loader/Loader'
>>>>>>> 545db58c8dbbed29f296e5d0e2452c8ff9ba0bd3

const ServiceContainer = () => {
	const [filteredServices, allServices] = useServices((state) => [
		state.filteredServices,
		state.allServices,
	]);

	return (
		<>
<<<<<<< HEAD
			{allServices.length ? (
				filteredServices.length && typeof filteredServices === "object" ? (
					filteredServices.map((service) => {
						return (
							<ServiceCard
								key={service._id}
								nombre={service.nombre}
								tipo={service.tipo}
								pais={service.pais}
								direccion={service.direccion}
								image={servicesImage}
								mail={service.mail}
								telefono={service.telefono}
								descripcion={service.descripcion}
								rating={service.rating}
								horarioAtencion={service.horarioAtencion}
							/>
						);
					})
				) : (
					<p>Lo sentimos, no hay servicios con esas características</p>
				)
			) : (
				<Loader />
			)}
=======
    {allServices.length ? (filteredServices.length && typeof filteredServices === 'object' ? (
				filteredServices.map((service) => {
					return (
						<ServiceCard
							key={service._id}
							nombre={service.nombre}
							tipo={service.tipo}
							pais={service.pais}
							direccion={service.direccion}
							image={servicesImage}
							mail={service.mail}
							telefono={service.telefono}
							descripcion={service.descripcion}
							rating={service.rating}
							horarioAtencion={service.horarioAtencion}
						/>
					);
				})
			) : (
				<p>Lo sentimos, no hay servicios con esas características</p>
			)) : <Loader /> }

>>>>>>> 545db58c8dbbed29f296e5d0e2452c8ff9ba0bd3
		</>
	);
};

export default ServiceContainer;
