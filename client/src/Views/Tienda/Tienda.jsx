import ProductsContainer from "../../components/ProductsContainer/ProductsContainer";
import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import { useState, useEffect } from "react";
import { useProduct, useUser } from "../../hooks/useStore";
import Loader from "../../components/Loader/Loader";

import style from "./Tienda.module.css";

export default function Tienda() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [filterBy, setFilterBy] = useState({
    categoria: "all",
    animal: "all",
    price: 300,
  });
  const [getUserInfo] = useUser((state) => [state.getUserInfo])
  const [
    getProducts,
    allProducts,
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
    setLoading(true);
    if (allProducts.length) setLoading(false);
  }, [allProducts]);

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getProducts();
    getCategories();
    getSpecies();
    getUserInfo(user.id)
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
        if (p.animal) return p.animal.toLowerCase() == animal;
      });
    }
    if (price < "300") {
      filtered = filtered.filter((p) => p.precio < Number(price).toFixed(2));
    }
    setFilter(filtered);
  }, [filterBy, allProducts]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      filteredProductsWOSearch.forEach((p) => {
        p.titulo.toLowerCase().includes(inputSearch.toLowerCase()) &&
          result.push(p);
      });
      searchProduct(result);
    } else if (inputSearch.length <= 0) {
      searchProduct(filteredProductsWOSearch);
    }
  }, [inputSearch]);

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

  const products = useProduct((state) => state.filteredProducts);

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;
  const pagesToShow = 3;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);
  const maxPages = Math.min(
    currentPage + Math.floor(pagesToShow / 2),
    totalPages
  );
  const minPages = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const pages = [...Array(maxPages - minPages + 1).keys()].map(
    (i) => minPages + i
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


    window.scrollTo(0, 0);


  return (
    <>
      <Meta title={"Tienda"} />
      <BreadCrump title="Tienda" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div
              className={`${style.filterCard} mb-3 p-3 col-12 col-md-4 col-lg-3`}
            >
              <div className="d-flex d-md-block">
                <div className="Category-filter mb-4 col col-md-12 me-2">
                  <p className={`${style.p} fw-bold`}>Categorías</p>
                  <select
                    name="categoria"
                    value={filterBy.categoria}
                    onChange={(e) => handlerFilter(e)}
                    className="form-select mb-3"
                    style={{
                      backgroundColor: "var(--body_background)",
                      color: "var(--body_color)",
                      border: "0.5px solid var(--border_color)",
                    }}
                    aria-label=".form-select-lg"
                  >
                    <option value="all">Todas</option>
                    {categories.length &&
                      categories.map((c, idx) => (
                        <option key={idx} value={c.toLowerCase()}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="Type-filter col col-md-12">
                  <p className={`${style.p} fw-bold`}>Especies</p>
                  <select
                    name="animal"
                    value={filterBy.animal}
                    onChange={(e) => handlerFilter(e)}
                    className="form-select mb-3"
                    style={{
                      backgroundColor: "var(--body_background)",
                      color: "var(--body_color)",
                      border: "0.5px solid var(--border_color)",
                    }}
                    aria-label=".form-select-lg"
                  >
                    <option value="all">Todos</option>
                    {species.map((s, idx) => (
                      <option key={idx} value={s.animal.toLowerCase()}>
                        {s.animal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`${style.rangePrice} mb-4 col-12`}>
                <p className={`${style.p} fw-bold`}>Rango de precio</p>
                <div className="ranges">
                  <div className="col-12 d-flex flex-md-column gap-10 justify-content-md-center justify-content-around">
                    <div className="d-flex gap-2 flex-row ">
                      <span className={style.prices}>Desde:</span>
                      <span className={style.num}>0 U$D</span>
                    </div>
                    <div className="d-flex gap-2 flex-row">
                      <span className={style.prices}>Hasta:</span>
                      <span className={style.num}>{filterBy.price} U$D</span>
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
                  step={10}
                  id="customRange3"
                />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div
                className={`${style.filterSortGrid} mb-4 p-2 d-flex flex-row justify-content-between`}
              >
                <div className="d-flex align-items-center gap-10 p-1 col col-md-6">
                  <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
                    Ordenar por:
                  </p>
                  <select
                    value={order}
                    onChange={(e) => handlerOrder(e)}
                    className="form-control form-select"
                    style={{
                      backgroundColor: "var(--body_background)",
                      color: "var(--body_color)",
                      border: "0.5px solid var(--border_color)",
                    }}
                    name="ordenar_por"
                    id="ordenar_por"
                  >
                    <option value="default" defaultValue disabled>
                      Selecciona
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
                <div
                  className={`d-flex align-items-center gap-10 col col-md-6 m-1 ${style.search}`}
                >
                  <p
                    className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}
                    style={{ width: "inherit" }}
                  >
                    Buscar producto:
                  </p>
                  <input
                    value={inputSearch}
                    onChange={(e) => handlerInput(e)}
                    className="form-control"
                    style={{
                      backgroundColor: "var(--body_background)",
                      color: "var(--body_color)",
                      border: "0.5px solid var(--border_color)",
                    }}
                    type="search"
                    name=""
                    id=""
                    placeholder="Buscar"
                  />
                </div>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="product-list pb-5">
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <ProductsContainer product={currentProducts} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 ? "d-none" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={handlePrevPage}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#0CC5BA",
                        fontWeight: "bold",
                      }}
                    >
                      Anterior
                    </button>
                  </li>
                  {pages.map((page) => (
                    <button
                      key={page}
                      className={`btn btn-outline-secondary mx-1 ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color:
                          page === currentPage
                            ? "#0CC5BA"
                            : "var(--body_color)",
                        outline: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "d-none" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#0CC5BA",
                        fontWeight: "bold",
                      }}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
