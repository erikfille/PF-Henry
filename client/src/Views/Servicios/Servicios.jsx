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
		locacion: "All",
		tipo: "All",
	});

	// Hooks store
	const [
		allServices,
		filteredServices,
		filteredServicesWOSearch,
		ordered,
		getServices,
		setFilter,
		searchServices,
	] = useServices((state) => [
		state.allServices,
		state.filteredServices,
		state.filteredServicesWOSearch,
		state.ordered,
		state.getServices,
		state.setFilter,
		state.searchServices,
	]);

	useEffect(() => {
		getServices();
	}, []);

	// Filters
	useEffect(() => {
		const { locacion, tipo } = filterBy;
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

	const handlerOrder = (e) => {
		e.preventDefault();
		if (e.target.value) ordered(e.target.value);
		setOrder(e.target.value);
	};

	const handlerFilter = (e) => {
		if (e.target.value) setFilterBy({ ...filterBy, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Meta title={"Servicios"} />
			<BreadCrump title="Servicios" />
			<div className="store-wrapper home-wrapper-2 py-5">
				<div className="container-xxl">
					<div className="row">
						<div className="col-12 col-lg-3">
							<div className={`${style.filterCard} mb-3 p-3 d-flex flex-lg-column`}>
								<div className="col-6 col-lg-12 service-filter mb-md-4 me-md-3 pe-2">
									<p className={`${style.p} mb-2 fw-bold`} style={{ width: "150px" }}>
										Filtrar por tipo:
									</p>
									<select
										name="tipo"
										value={filterBy.tipo}
										onChange={(e) => handlerFilter(e)}
										className="form-select form-select-lg mb-3 fw-light fs-6"
										style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", border: "0.5px solid var(--border_color)"}}
										aria-label=".form-select-lg">
										<option value="All" defaultValue>
											Todos
										</option>
										<option value="Clinica">Clínicas</option>
										<option value="Tienda">Tienda</option>
										<option value="Spa">Spa</option>
										<option value="Hogar">Hogar / Cuidado</option>
									</select>
								</div>
								<div className="col-6 col-lg-12 location-filter">
									<p className={`${style.p} mb-2 fw-bold`} style={{ width: "150px" }}>
										Filtrar por pais:
									</p>
									<select
										name="locacion"
										value={filterBy.locacion}
										onChange={(e) => handlerFilter(e)}
										className="form-select form-select-lg mb-3 fw-light fs-6"
										style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", border: "0.5px solid var(--border_color)"}}
										aria-label=".form-select-lg">
										<option value="All" defaultValue>
											Todos
										</option>
										<option value="Argentina">Argentina</option>
										<option value="Venezuela">Venezuela</option>
										<option value="Colombia">Colombia</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-9">
							<div className={`${style.filterSortGrid} mb-4 p-0 p-md-2`}>
								<div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
									<div className="d-flex align-items-center gap-10 mb-2 px-3 mb-md-0">
										<p className={`${style.p} mb-0 fw-bold`} style={{ width: "150px" }}>
											Ordenar por:
										</p>
										<select
											value={order}
											onChange={(e) => handlerOrder(e)}
											className="form-control form-select"
											style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", border: "0.5px solid var(--border_color)"}}
											name="ordenar_por"
											id="ordenar_por">
											<option value="all" defaultValue>
												Defecto
											</option>
											<option value="alfabetico-ascendente">Alfabeticamente A-Z</option>
											<option value="alfabetico-descendente">Alfabeticamente Z-A</option>
										</select>
									</div>
									<div className="d-flex align-items-center gap-10">
										<p className={`${style.p} mb-0 fw-bold`} style={{ width: "200px" }}>
											Buscar Servicio
										</p>
										<input
											value={inputSearch}
											onChange={(e) => handlerInput(e)}
											placeholder="Ej: salud"
											className="form-control"
											style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", border: "0.5px solid var(--border_color)"}}
											type="search"
											name=""
											id=""
										/>
									</div>
								</div>
							</div>
							<div className="pb-5">
								<div className="d-flex flex-column gap-5">
									<ServiceContainer />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
