import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import styles from "./ProductReviews.module.css";
import { useProduct } from "../../hooks/useStore";
export default function ProductReviews(props) {
  const { _id, rating } = props.productDetail;

  const [reviews, setReviews] = useState([
    {
      usuario: "Jorge Vega",
      rating: 4,
      fecha: "27/03/2023",
      comentario:
        "A mi mascota le encanta este juguete, le parece muy divertido y pasamos mucho tiempo juntos jugando con el.",
    },
    {
      usuario: "Martina Scomazzon",
      rating: 5,
      fecha: "20/03/2023",
      comentario:
        "¡Esta fantástico este juguete! Con mi gata lo usamos juntas mientras charlamos en ingles",
    },
    {
      usuario: "Franco Etcheverri",
      rating: 2,
      fecha: "16/02/2023",
      comentario:
        "El juguete esta bien, pero no veo como esto afecta a la puntuacion de Ferro en el torneo",
    },
  ]);
  const [averageReviews, setAverageReviews] = useState(0);
  const [qualify, setQualify] = useState(0);
  const [review, setReview] = useState("");
  const [user, setUser] = useState({});

  let [productReviews, getReviews, sendReview] = useProduct((state) => [
    state.productReviews,
    state.getReviews,
    state.sendReview,
  ]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    getReviews(_id);
  }, []);

  useEffect(() => {
    setReviews(productReviews);
  }, [productReviews]);

  function handleInputChange(e) {
    setReview(e.target.value);
  }

  function handleSubmit() {
    let newReview = {
      comentario: review,
      puntuacion: qualify,
      usuario: user,
      producto: _id,
    };
    sendReview(newReview);
  }

  return (
    <div>
      {/* <h1 className="fw-bold mb-5">Reseñas</h1> */}
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
              Basada en {reviews.length} usuarios
            </span>

            <hr className={styles.hr} />
            {user && user.id ? (
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
              "Debes estar logueado para poder dejar un comentario"
            )}
            <div className="mt-5">
              {reviews.length
                ? reviews.map((r) => (
                    <div className="mt-5">
                      <div className="d-sm-flex align-items-end mt-0">
                        <h1 className={`${styles.fColor} fw-bold fs-3 me-3`}>
                          {r.usuario.name /* + " " + r.usuario.apellido */}
                        </h1>
                        <ReactStars
                          count={5}
                          size={20}
                          value={r.puntuacion}
                          edit={false}
                          activeColor="#ffd700"
                          className={styles.stars}
                        />
                      </div>
                      <div>
                        <span className={`${styles.span}`}>{r.fecha}</span>
                        <p className={`${styles.span} pt-3`}>{r.comentario}</p>
                      </div>
                    </div>
                  ))
                : "Se el primero en comentar algo de este producto"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
