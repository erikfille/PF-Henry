import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";

import React from "react";

export default function ProductReviews(props) {
  const { productId } = props;

  const [reviews, setReviews] = useState({});
  const [averageReviews, setAverageReviews] = useState({});
  const [qualify, setQualify] = useState(0);
  const [review, setReview] = useState("");

  /*

  propiedades de reviews:
  - userId
  - comentario
  - puntuacion
  - fecha

  */

  useEffect(() => {
    axios
      .get(`/reviews/${productId}`)
      .then((data) => {
        console.log(data.data);
        setReviews(data.data);
      })
      .then(() => {
        reviewsAverage();
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

    return () => setReviews({});
  }, [productId]);

  function reviewsAverage() {
    let puntuaciones = [];

    for (let review in reviews) {
      puntuaciones.push(review.puntuacion);
    }

    let promedioPuntuaciones = puntuaciones
      .reduce((acc, curr) => acc + curr)
      .toFixed(1);

    setAverageReviews(promedioPuntuaciones);
  }

  function handleInputChange(e) {
    setReview(e.target.value);
  }

  return (
    <div className="reviewsContainer">
      <h1>Reseñas</h1>
      <div className="clientsReviewsContainer">
        <h1>Reseñas de Clientes</h1>
        <ReactStars
          count={5}
          size={20}
          value={averageReviews}
          edit={false}
          activeColor="#ffd700"
        />
        <hr />
        <div className="yourReview">
          <h2>Escribe una reseña</h2>
          <h3>Calificación</h3>
          <ReactStars
            count={5}
            size={20}
            value={qualify}
            edit={true}
            activeColor="#ffd700"
          />
          <h3>Reseña</h3>
          <textarea
            placeholder="Escribe aquí tu reseña"
            type="text"
            name="review"
            value={review}
            onChange={handleInputChange}
          />
        </div>
        <div className="otherReviews">
          {reviews.map((r) => (
            <div className="userReview">
              <h1>{r.usuario}</h1>
              <ReactStars
                count={5}
                size={20}
                value={r.puntuacion}
                edit={false}
                activeColor="#ffd700"
              />
              <span>{r.fecha}</span>
              <p>{r.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
