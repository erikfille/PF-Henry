import ProductCard from "../ProductCard/ProductCard";
// import { products } from '../../Views/Tienda/helper';
import style from "./Cart.module.css";
import { useState, useEffect } from "react";
import { useProduct } from "../../hooks/useStore";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false); // El boton de CART del header debe modificar este estado. inicalmente debe estar en False.
  const [
    cartProducts,
    cartState,
    setActiveCart,
    setCartRemove,
    setTotalPrice,
    totalPrice,
  ] = useProduct((state) => [
    state.cartProducts,
    state.cartState,
    state.setActiveCart,
    state.setCartRemove,
    state.setTotalPrice,
    state.totalPrice,
  ]);

  useEffect(() => {
    setIsOpen(cartState);
  }, [cartState]);

  useEffect(() => {
    if (typeof cartProducts === "object" && cartProducts.length) {
      let totalBuy = 0;
      cartProducts.forEach((p) => (totalBuy += p.precio * p.quantity));
      setTotalPrice(totalBuy.toFixed(2));
    } else {
      setTotalPrice(0);
    }
  }, [cartProducts]);

	//? Genero ID de la orden de compra para usar con mp en checkout
	const [ordenId, setOrdenId] = useState(null);

  	const handleConfirmOrder = () => {
    const newOrdenId = uuidv4();
    setOrdenId(newOrdenId);
    // ? Dice chatgpt :aquí puedes hacer otras cosas con el ID, como guardarlo en una base de datos o enviarlo a un servidor
  };

	return (
		<>
			<div className={`${style.shoppingCart} ${isOpen ? style.show : style.hidden}`}>
				<div className="d-flex justify-content-end">
					<button onClick={() => setActiveCart()} className="button">
						Cerrar
					</button>
				</div>
        <div
          className={`${style.titleCart} d-flex flex-column align-items-center my-5 gap-2`}
        >
          <img
            src="src/images/logo-pet.png"
            alt="logo-pet"
            style={{ width: "30px", height: "30px" }}
          />
          <h2>Tu Carrito</h2>
        </div>

        <div className={style.imgBg}>
          <img
            src="src/images/logo-bg-product.png"
            alt="img-logo"
            style={{ width: "330px" }}
          />
        </div>
        {!cartProducts.length ? (
          <>
            <div
              className={`${style.cartEmpty} d-flex flex-column align-items-center py-5`}
            >
              <p>Tu carrito esta vacio</p>
              <NavLink onClick={() => setActiveCart()} to="/tienda">
                Ir a la tienda
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${style.products} d-flex flex-column align-items-center`}
            >
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
                  <h6>{totalPrice}</h6>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center gap-10 justify-content-center">
                <NavLink to="/checkout">
                  <button
                    className="button"
                    onClick={() => setActiveCart(false)}
                  >
                    Confirmar pedido
                  </button>
                </NavLink>
                <a
                  href="/tienda"
                  className={`d-flex flex-column align-items-center py-2`}
                >
                  <p>Seguir Comprando</p>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
