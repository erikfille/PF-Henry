// import { services } from "../../Views/Servicios/helperService";
import { useServices } from "../../hooks/useStore";
import ServiceCard from "../ServiceCard/ServiceCard";

const ServiceContainer = () => {
	const [filteredServices] = useServices((state) => [state.filteredServices]);

	return (
		<>
			{filteredServices.length ? (
				filteredServices.map((service) => {
					return (
						<ServiceCard
							nombre={service.nombre}
							tipo={service.tipo}
							pais={service.pais}
							direccion={service.direccion}
							image={service.image}
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
