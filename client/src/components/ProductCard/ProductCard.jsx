import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useStore";
import { useModal } from "../../hooks/useStore";
import style from "./ProductCard.module.css";

export default function ProductCard(props) {
	const [setCartRemove] = useProduct((state) => [state.setCartRemove]);
	const [setModal] = useModal((state) => [state.setModal]);

  if (props.showAs === "cart") {
    return (
      <>
        <div className={`${style.productCart} col-12 d-flex gap-3 py-3 align-items-center justify-content-center`}>
          <Link to={`/productos/${props.id}/customer`}>
            <div className="ms-2 imagen">
              <img
                src={props.imagen}
                alt={props.titulo}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </Link>
            <div className="d-flex flex-column gap-1 tituloPrecio w-50 ps-4">
              <h5 className={`${style.title} mb-0`}>{props.titulo}</h5>
              {/* <p className={`${style.sku}sku mb-0`}>SKU-{props.stock}</p> */}
              <p className={`${style.price} mb-0`}>{props.price} U$D</p>
            </div>
          <div className="d-flex flex-column cantidad me-3 align-items-center">
            <h5 className={`${style.cant} mb-0`}>Cant</h5>
            <h5 className={`${style.cant} mb-0`}>{props.cant}</h5>
          </div>
          <div className="d-flex justify-content-center align-items-center botonEliminar">
            <button
              className={style.buttonDelete}
              onClick={() =>
                setModal(
                  "Eliminar Producto",
                  "¿Deseas eliminar este producto?",
                  setCartRemove,
                  [props.id]
                )
              }
            >
              <RiDeleteBin6Line className={style.iconDelete} />
            </button>
          </div>
        </div>
      </>
    );
  }
  if (props.showAs === "adminDetail") {
    return (
      <>
        <div className={`${style.productCart} col-12 d-flex gap-3 py-2 align-items-center `}>
          <Link to={`/productos/${props.id}`}>
            <div className="ms-2 imagen">
              <img
                src={props.imagen}
                alt={props.titulo}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </Link>
          <div className="d-flex ps-4 gap-80">
            <h5 className={`${style.title} mb-0`}>{props.titulo}</h5>
            <p className={`${style.price} mb-0`}>{props.price}</p>
          </div>
        </div>
      </>
    );
  }
	return (
		<>
			<div className={`${style.productCard} col-3,5 px-3 py-3`}>
				{/* <div className="d-flex justify-content-end">
					<img style={{ width: "40px" }} src="src/images/logo-pet.png" alt="logo"></img>
				</div> */}
				<div
					className={`${style.imgContainer} d-flex justify-content-center bg-white overflow-hidden`}>
					<img src={props.imagen} alt="juguete para perro" className={style.imgProduct} />
				</div>
				<hr />
				<p className={style.p}>{props.titulo}</p>
				<div className="d-flex align-items-center gap-2 mb-0">
					<ReactStars
						count={5}
						size={20}
						value={props.rating}
						edit={false}
						activeColor="#ffd700"
					/>
					<p className={`${style.rating} mb-0`}>({props.rating && props.rating.toFixed(1)} )</p>
				</div>
				<p className={style.p}>{props.precio} U$D</p>
			</div>
		</>
	);
}
