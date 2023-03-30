import { useServices } from "../../hooks/useStore";
import ServiceCard from "../ServiceCard/ServiceCard";
import servicesImage from '../../../public/images/service-img.jpg'
const ServiceContainer = () => {
	const [filteredServices, allServices] = useServices((state) => [
		state.filteredServices,
		state.allServices,
	]);

	return (
		<>
			{filteredServices.length && typeof filteredServices === 'object' ? (
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
			)}
		</>
	);
};

export default ServiceContainer;
