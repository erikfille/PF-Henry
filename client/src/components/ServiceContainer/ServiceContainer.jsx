// import { services } from "../../Views/Servicios/helperService";
import ServiceCard from "../ServiceCard/ServiceCard";

const ServiceContainer = ({ allServices }) => {
	return (
		<>
			{allServices.map((service) => {
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
			})}
		</>
	);
};

export default ServiceContainer;
