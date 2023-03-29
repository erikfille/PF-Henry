import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
// import { BiSearchAlt2 } from "react-icons/bi";
import style from "./Tienda.module.css";
import { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useStore";

export default function Tienda() {
  const [order, setOrder] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [filterBy, setFilterBy] = useState({
    categoria: "all",
    animal: "all",
    price: 300,
  });

  const [
    getProducts,
    allProducts,
    filteredProducts,
    filteredProductsWOSearch,
    ordered,
    searchProduct,
    setFilter,
    categories,
    getCategories,
    species,
    getSpecies,
  ] = useProduct((state) => [
    state.getProducts,
    state.allProducts,
    state.filteredProducts,
    state.filteredProductsWOSearch,
    state.ordered,
    state.searchProduct,
    state.setFilter,
    state.categories,
    state.getCategories,
    state.species,
    state.getSpecies,
  ]);

  useEffect(() => {
    getProducts();
    getCategories();
    getSpecies()
  }, []);

  useEffect(() => {
    const { categoria, animal, price } = filterBy;

    let filtered = allProducts;
    if (categoria !== "all") {
      filtered = filtered.filter(
        (p) => p.categoria.nombre.toLowerCase() === categoria
      );
    }
    if (animal !== "all") {
      filtered = filtered.filter((p) => {
        if(p.animal) return p.animal.toLowerCase() == animal;
      });
    }
    if (price < "300") {
      filtered = filtered.filter((p) => p.precio < Number(price));
    }
    setFilter(filtered);
  }, [filterBy, allProducts]);

	useEffect(() => {
		if (inputSearch.length > 0) {
			let result = [];
			filteredProducts.forEach((p) => {
				p.titulo.toLowerCase().includes(inputSearch.toLowerCase()) && result.push(p);
			});
			searchProduct(result);
		} else if (inputSearch.length <= 0) {
			searchProduct(filteredProductsWOSearch);
		}
	}, [inputSearch]);

	const handleOnChange = (e) => {
		setValue(e.target.value);
	};

	const handlerOrder = (e) => {
		e.preventDefault();
		if (e.target.value) ordered(e.target.value);
		setOrder(e.target.value);
	};

	const handlerFilter = (e) => {
		if (e.target.value) {
			setFilterBy({ ...filterBy, [e.target.name]: e.target.value });
		}
	};

	const handlerInput = (e) => {
		setInputSearch(e.target.value);
		searchProduct(inputSearch);
	};

  return (
    <>
      <Meta title={"Tienda"} />
      <BreadCrump title="Tienda" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className={`${style.filterCard} mb-3 p-3`}>
                <div className="Category-filter mb-4">
                  <select
                    name="categoria"
                    value={filterBy.categoria}
                    onChange={(e) => handlerFilter(e)}
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg"
                  >
                    <option selected disabled>
                      Categorías
                    </option>
                    <option value="all">Todas</option>
                    {categories.length &&
                      categories.map(
                        (c) =>
                          c.tipo === "Producto" && (
                            <option value={c.nombre.toLowerCase()}>
                              {c.nombre}
                            </option>
                          )
                      )}
                  </select>
                </div>
                <div className={`${style.rangePrice} mb-4`}>
                  <label htmlFor="customRange3" className="form-label">
                    Rango de precio
                  </label>
                  <div className="ranges">
                    <div className="d-flex flex-column gap-10 justify-content-center">
                      <div className="d-flex gap-2">
                        <span className={style.prices}>Desde:</span>
                        <span>0 U$D</span>
                      </div>
                      <div className="d-flex gap-2">
                        <span className={style.prices}>Hasta:</span>
                        <span>{filterBy.price} U$D</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    className="form-range"
                    name="price"
                    value={filterBy.price}
                    onChange={(e) => handlerFilter(e)}
                    min={0}
                    max={300}
                    step={5}
                    id="customRange3"
                  />
                </div>
                <div className="Type-filter">
                  <select
                    name="animal"
                    value={filterBy.animal}
                    onChange={(e) => handlerFilter(e)}
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg"
                  >
                    <option selected disabled>
                      Especie
                    </option>
                    <option value="all">Todos</option>
                    {species.map(s => <option value={s.animal.toLowerCase()}>{s.animal}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className={`${style.filterSortGrid} mb-4 p-2`}>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0" style={{ width: "150px" }}>
                      Ordenar por:
                    </p>
                    <select
                      value={order}
                      onChange={(e) => handlerOrder(e)}
                      className="form-control form-select"
                      name="ordenar_por"
                      id="ordenar_por"
                    >
                      <option selected disabled>
                        Ordenar por
                      </option>
                      <option value="alfabetico-ascendente">
                        Alfabeticamente A-Z
                      </option>
                      <option value="alfabetico-descendente">
                        Alfabeticamente Z-A
                      </option>
                      <option value="popularidad">Popularidad</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0" style={{ width: "210px" }}>
                      Buscar producto
                    </p>
                    <input
                      value={inputSearch}
                      onChange={(e) => handlerInput(e)}
                      className="form-control"
                      type="search"
                      name=""
                      id=""
                    />
                  </div>
                </div>
              </div>
              <div className="product-list pb-5">
                <div className="d-flex flex-wrap gap-2">
                  <ProductsContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
