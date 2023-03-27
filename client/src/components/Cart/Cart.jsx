import ProductCard from "../ProductCard/ProductCard";
// import { products } from '../../Views/Tienda/helper';
import style from "./Cart.module.css";
import { useState } from "react";
import { useProduct } from "../../hooks/useStore";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false); // El boton de CART del header debe modificar este estado. inicalmente debe estar en False.

  const [cartProducts, cartState, setActiveCart] = useProduct((state) => [
    state.cartProducts,
    state.cartState,
    state.setActiveCart,
  ]);

  useEffect(() => {
   setIsOpen(cartState)
  }, [cartState])

  return (
    <>
      <div
        className={style.shoppingCart}
        style={{ display: cartState ? "block" : "none" }}
      >
        <div className="d-flex justify-content-end">
          <button onClick={() => setActiveCart()} className="button">
            Close
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

        {cartProducts.length === 0 ? (
          <>
            <div
              className={`${style.cartEmpty} d-flex flex-column align-items-center py-5`}
            >
              <p>Tu carrito esta vacio</p>
              <a href="#tienda">Ir a la tienda</a>
            </div>
          </>
        ) : (
          <>
            <div className={style.products}>
              {cartProducts.map(
                (
                  product // Aca se mapea los items de cart del store.
                ) => (
                  <ProductCard // y por cada item renderiza una card con el estilo para el carrito.
                    key={product._id}
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
                  <h6>Total (AR$)</h6>
                  <h6>30.000</h6>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="button">Confirmar pedido</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
