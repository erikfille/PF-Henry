import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import { useState } from "react";
import ServiceContainer from "../../components/ServiceContainer/ServiceContainer";
import style from "./Servicios.module.css";
import { useServices } from "../../hooks/useStore";
import { useEffect } from "react";

export default function Servicios() {
	const [order, setOrder] = useState("");
	const [inputSearch, setInputSearch] = useState("");
  const [filterBy, setFilterBy] = useState({
    locacion: 'All',
    tipo: 'All'
  })

	// Hooks store
	const [allServices, filteredServices, filteredServicesWOSearch, ordered, setFilter, searchServices] =
  useServices((state) => [
    state.allServices,
    state.filteredServices,
    state.filteredServicesWOSearch,
    state.ordered,
    // state.getServices,
    state.setFilter,
    state.searchServices
  ]);

  // useEffect(() => {
  //   getServices();
  // }, []);

  // Filters
  useEffect(() => {
    const {locacion, tipo} = filterBy;
    let filtered = allServices;

    if (locacion !== "All") {
      filtered = filtered.filter((s) => s.pais == locacion);
    }
    if (tipo !== "All") {
      filtered = filtered.filter((s) => s.tipo === tipo);
    }

    setFilter(filtered);
  }, [filterBy]);

  // Busqueda
  useEffect(() => {
		if (inputSearch.length > 0) {
			let result = [];
			filteredServices.forEach((s) => {
				s.nombre.toLowerCase().includes(inputSearch.toLowerCase()) && result.push(s);
			});
			searchServices(result);
		} else if (inputSearch.length <= 0) {
			searchServices(filteredServicesWOSearch);
		}
	}, [inputSearch]);

	const handlerInput = (e) => {
		setInputSearch(e.target.value);
	};


	// const handlerSearchSubmit = (e) => {
	// 	e.preventDefault();
	// 	inputSearch && searchService(inputSearch);
	// 	setInputSearch(" ");
	// };

	const handlerOrder = (e) => {
		e.preventDefault();
		if (e.target.value) ordered(e.target.value);
		setOrder(e.target.value);
	};

	const handlerFilter = (e) => {
		if (e.target.value) setFilterBy({...filterBy, [e.target.name] : e.target.value});
	};

	// Cuando monta hace el pedido a la api
	// useEffect(() => {
	// 	getServices();
	// }, []);

	return (
		<>
			<Meta title={"Servicios"} />
			<BreadCrump title='Servicios' />
			<div className='store-wrapper home-wrapper-2 py-5'>
				<div className='container-xxl'>
					<div className='row'>
						<div className='col-3'>
							<div className={`${style.filterCard} mb-3 p-3`}>
								<div className='service-filter mb-4'>
                <p className='mb-2' style={{ width: "150px" }}>
										Filtrar por tipo:
									</p>
									<select
                    name="tipo"
										value={filterBy.tipo}
										onChange={(e) => handlerFilter(e)}
										className='form-select form-select-lg mb-3'
										aria-label='.form-select-lg'>
										<option value='All'defaultValue>Todos</option>
										<option value='Clinica'>Clínicas</option>
										<option value='Tienda'>Tienda</option>
										<option value='Spa'>Spa</option>
										<option value='Hogar'>Hogar / Cuidado</option>
									</select>
								</div>
								<div className='location-filter'>
									<p className='mb-2' style={{ width: "150px" }}>
										Filtrar por pais:
									</p>
									<select
                    name="locacion"
										value={filterBy.locacion}
										onChange={(e) => handlerFilter(e)}
										className='form-select form-select-lg mb-3'
										aria-label='.form-select-lg'>
										<option value='All' defaultValue>
											Todos
										</option>
										<option value='Argentina'>Argentina</option>
										<option value='Venezuela'>Venezuela</option>
										<option value='Colombia'>Colombia</option>
									</select>
								</div>
							</div>
						</div>
						<div className='col-9'>
							<div className={`${style.filterSortGrid} mb-4 p-2`}>
								<div className='d-flex justify-content-between align-items-center flex-wrap'>
									<div className='d-flex align-items-center gap-10'>
										<p className='mb-0' style={{ width: "150px" }}>
											Ordenar por:
										</p>
										<select
											value={order}
											onChange={(e) => handlerOrder(e)}
											className='form-control form-select'
											name='ordenar_por'
											id='ordenar_por'>
											<option value='all' defaultValue>
												Defecto
											</option>
											<option value='alfabetico-ascendente'>Alfabeticamente A-Z</option>
											<option value='alfabetico-descendente'>Alfabeticamente Z-A</option>
										</select>
									</div>
									<div className='d-flex align-items-center gap-10'>
										<p className='mb-0' style={{ width: "200px" }}>
											Buscar Servicio
										</p>
										<input
											value={inputSearch}
											onChange={(e) => handlerInput(e)}
											className='form-control'
											type='search'
											name=''
											id=''
										/>
										{/* <button className={style.buttonSearch} onClick={(e) => handlerSearchSubmit(e)}>
											<i>
												<BiSearchAlt2 className={style.iconSearch} />
											</i>
										</button> */}
									</div>
								</div>
							</div>
							<div className='pb-5'>
								<div className='d-flex flex-column gap-5'>
									<ServiceContainer/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
