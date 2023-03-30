import ProductCard from "../ProductCard/ProductCard";
// import { products } from '../../Views/Tienda/helper';
import style from "./Cart.module.css";
import { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useStore";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false); // El boton de CART del header debe modificar este estado. inicalmente debe estar en False.
  const [total, setTotal] = useState(0);

  const [cartProducts, cartState, setActiveCart, setCartRemove] = useProduct(
    (state) => [
      state.cartProducts,
      state.cartState,
      state.setActiveCart,
      state.setCartRemove,
    ]
  );

  useEffect(() => {
    setIsOpen(cartState);
  }, [cartState]);

  useEffect(() => {
    if (typeof cartProducts === "object" && cartProducts.length) {
      let totalBuy = 0;
      cartProducts.forEach((p) => (totalBuy += p.precio * p.quantity));
      setTotal(totalBuy.toFixed(2));
    }
  }, [cartProducts]);

  return (
    <>
      <div
        className={style.shoppingCart}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="d-flex justify-content-end">
          <button onClick={() => setActiveCart()} className="button">
            Cerrar
          </button>
        </div>

        <div
          className={`${style.titleCart} d-flex flex-column align-items-center my-5 gap-2`}
        >
          <img
            src="images/logo-pet.png"
            alt="logo-pet"
            style={{ width: "30px", height: "30px" }}
          />
          <h2>Tu Carrito</h2>
        </div>

        <div className={style.imgBg}>
          <img
            src="images/logo-bg-product.png"
            alt="img-logo"
            style={{ width: "430px" }}
          />
        </div>

        {!cartProducts.length ? (
          <>
            <div
              className={`${style.cartEmpty} d-flex flex-column align-items-center py-5`}
            >
              <p>Tu carrito esta vacio</p>
              <NavLink onClick={() => setActiveCart()} to="/tienda">Ir a la tienda</NavLink>
            </div>
          </>
        ) : (
          <>
            <div className={`${style.products} d-flex flex-column align-items-center`}>
              {typeof cartProducts === "object" &&
                cartProducts.length &&
                cartProducts.map(
                  (
                    product // Aca se mapea los items de cart del store.
                  ) => (
                    <ProductCard // y por cada item renderiza una card con el estilo para el carrito.
                      key={product._id}
                      id={product._id}
                      titulo={product.titulo}
                      price={product.precio}
                      imagen={product.imagen}
                      cant={product.quantity}
                      showAs="cart"
                    />
                  )
                )}
            </div>
            <div className={style.container}>
              <div className={`${style.totalContainer} mb-5`}>
                <div
                  className={`${style.total} d-flex justify-content-between mb-2`}
                >
                  <h6>Total ($ USD)</h6>
                  <h6>{total}</h6>
                </div>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                <button className="button">Confirmar pedido</button>
                <NavLink className={style.navlink} onClick={() => setActiveCart()} to="/tienda">Seguir comprando</NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
