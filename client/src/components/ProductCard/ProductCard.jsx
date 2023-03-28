import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProduct } from "../../hooks/useStore";
import style from "./ProductCard.module.css";

export default function ProductCart(props) {
  const [setCartRemove] = useProduct((state) => [state.setCartRemove]);

  if (props.showAs === "cart") {
    return (
      <>
        <div
          className={`${style.productCart} col-12 d-flex gap-4 p-3 align-items-center justify-content-center`}
        >
          <img
            src={props.imagen}
            alt={props.titulo}
            style={{ width: "50px", height: "50px" }}
            className="me-3"
          />
          <div className="d-flex flex-column gap-1">
            <h5 className={`${style.title} mb-0`}>{props.titulo}</h5>
            <p className={`${style.sku}sku mb-0`}>SKU-{props.stock}</p>
            <p className={`${style.price} mb-0`}>AR$ {props.precio}</p>
          </div>
          <div className="d-flex flex-column me-3">
            <h5>Cant</h5>
            <input
              className={`form-control ${style.cant}`}
              type="number"
              value={props.cant}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              className={style.buttonDelete}
              onClick={() => setCartRemove()}
            >
              <RiDeleteBin6Line className={style.iconDelete} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${style.productCard} col-3,5 px-3 py-3`}>
        <div className="d-flex justify-content-end">
          <img
            style={{ width: "40px" }}
            src="images/logo-pet.png"
            alt="logo"
          ></img>
        </div>
        <div className="d-flex justify-content-center">
          <img
            src={props.imagen}
            alt="juguete para perro"
            style={{ width: "170px", height: "170px" }}
          />
        </div>
        <hr />
        <p className={style.p}>{props.titulo}</p>
        <div className="d-flex align-items-center gap-2 mb-0">
          <ReactStars
            count={5}
            size={20}
            value={props.rating}
            edit={true}
            activeColor="#ffd700"
          />
          <p className="mb-0">( {props.rating} )</p>
        </div>
        <p className={style.p}>AR$ {props.precio}</p>
      </div>
    </>
  );
}
