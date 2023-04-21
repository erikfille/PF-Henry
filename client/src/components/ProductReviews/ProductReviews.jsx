import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import styles from "./ProductReviews.module.css";
import { useProduct, useModal, useUser } from "../../hooks/useStore";

export default function ProductReviews(props) {
  const { updateComments, from } = props;
  const { _id, rating, comentarios } = props.productDetail;

  const [qualify, setQualify] = useState(0);
  const [review, setReview] = useState("");
  const [user, setUser] = useState({});
  const [ableToComment, setAbleToComment] = useState(true);

  let [sendReview] = useProduct((state) => [state.sendReview]);
  let [setModalInfo] = useModal((state) => [state.setModalInfo]);

  const [compras] = useUser((state) => [state.compras]);

  const isPurchased = compras.length && compras.some((c) => c.id_producto._id === _id)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user && user.id) {
      comentarios.forEach((c) => {
        if (c.usuario._id === user.id) setAbleToComment(false);
      });
    }
    else if (from === "admin") {
      setAbleToComment(false);
    } else setAbleToComment(true);
  }, [updateComments, comentarios]);

  function handleInputChange(e) {
    setReview(e.target.value);
  }

  function handleSubmit() {
    let newReview = {
      comentario: review,
      puntuacion: qualify,
      usuario: user.id,
      producto: _id,
    };
    sendReview(newReview);
    setModalInfo(
      "¡Reseña Enviada Exitosamente!",
      "¡Tu reseña se ha enviado correctamente!",
      updateComments,
      []
    );
    setAbleToComment(false);
  }

  function returnMessage() {
    if (!user) return "Debes estar logueado para poder dejar un comentario";
    if (!isPurchased) return "Debes comprar este producto para dejar tu comentario"
    if (user && user.id && !ableToComment) return "Ya has reseñado este producto";
    if (from === "admin") return "";
  }

  return (
    <div>
      <div className="container-xxl">
        <div className="row">
          <div
            className={`${styles.containerReview} col-12 container-md mb-5 p-5`}
          >
            <h1 className={`${styles.fColor} fw-bold`}>Reseñas de Clientes</h1>
            <ReactStars
              count={5}
              size={20}
              value={rating}
              edit={false}
              activeColor="#ffd700"
              className={`d-inline-flex me-3 ${styles.stars}`}
            />
            <span className={`${styles.span} fw-bold`}>
              Basada en {comentarios.length} usuarios
            </span>

            <hr className={styles.hr} />
            {user && user.id && ableToComment && isPurchased ? (
              <div className="">
                <h3 className={`${styles.fColor}  fw-bold fs-5`}>
                  Escribe una reseña
                </h3>
                <p className={`${styles.span} fw-bold mb-1`}>Calificación</p>
                <ReactStars
                  count={5}
                  size={20}
                  value={qualify}
                  edit={true}
                  activeColor="#ffd700"
                  onChange={(e) => setQualify(e)}
                />
                <p className={`${styles.span} fw-bold mt-2`}>Reseña</p>
                <textarea
                  className={`form-control ${styles.textReview}`}
                  style={{
                    backgroundColor: "var(--body_background)",
                    color: "var(--body_color)",
                    border: "0.5px solid var(--border_color)",
                  }}
                  placeholder="Escribe aquí tu reseña"
                  type="text"
                  name="review"
                  value={review}
                  onChange={handleInputChange}
                />
                <button className="button mt-3" onClick={() => handleSubmit()}>
                  Enviar Reseña
                </button>
              </div>
            ) : (
              <p>{returnMessage()}</p>
            )}
            <div className="mt-5">
              {comentarios && comentarios.length ? (
                comentarios.map(
                  (r) =>
                    r.usuario.name && (
                      <div key={r._id || r.id} className="mt-5">
                        <div className="d-sm-flex align-items-end mt-0">
                          <h1 className={`${styles.fColor} fw-bold fs-3 me-3`}>
                            {`${r.usuario.name[0].toUpperCase()}${r.usuario.name.slice(
                              1
                            )} ${r.usuario.surname[0].toUpperCase()}${r.usuario.surname.slice(
                              1
                            )}`}
                          </h1>
                          <ReactStars
                            count={5}
                            size={20}
                            value={r.puntuacion ? r.puntuacion : 0}
                            edit={false}
                            activeColor="#ffd700"
                            className={styles.stars}
                          />
                        </div>
                        <div>
                          <span className={`${styles.span}`}>
                            {r.fecha.slice(0, 10)}
                          </span>
                          <p className={`${styles.span} pt-3`}>
                            {r.comentario}
                          </p>
                        </div>
                      </div>
                    )
                )
              ) : (
                <>
                  <hr />
                  <p>Este producto no posee comentarios</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
