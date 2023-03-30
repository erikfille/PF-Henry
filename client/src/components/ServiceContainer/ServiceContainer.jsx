import { useServices } from "../../hooks/useStore";
import ServiceCard from "../ServiceCard/ServiceCard";
import servicesImage from '../../../public/images/service-img.jpg'
import Loader from '../Loader/Loader'

const ServiceContainer = () => {
	const [filteredServices, allServices] = useServices((state) => [
		state.filteredServices,
		state.allServices,
	]);

	return (
		<>
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

		</>
	);
};

export default ServiceContainer;

/*
{allServices.lenght ? ({filteredServices.length && typeof filteredServices === 'object' ? (
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
			)}) : <Loader /> }

{allServices.length}
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
*/
{}
