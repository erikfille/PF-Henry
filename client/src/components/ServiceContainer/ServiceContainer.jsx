import { services } from '../../Views/Servicios/helperService';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServiceContainer = () => {
    return (
        <>
            {
            services.map(service => {
                return <ServiceCard
                    title = {service.title}
                    service = {service.service}
                    country = {service.country}
                    address = {service.address}
                    image = {service.image}
                />
            })
            }
        </>
    )
}

export default ServiceContainer;