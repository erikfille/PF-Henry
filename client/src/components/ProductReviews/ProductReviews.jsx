import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";

export default function ProductReviews(props) {
  const { productId } = props;

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
  /*

  propiedades de reviews:
  - userId
  - comentario
  - puntuacion
  - fecha

  */

  // useEffect(() => {
  //   // axios
  //   //   .get(`/reviews/${productId}`)
  //   //   .then((data) => {
  //   //     console.log(data.data);
  //   //     setReviews(data.data);
  //   //   })
  //   //   .then(() => {
  //   //     reviewsAverage();
  //   //   })
  //   //   .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

  //   return () => setReviews({});
  // }, [productId]);

  function reviewsAverage() {
    let puntuaciones = [];

    for (let review in reviews) {
      puntuaciones.push(review.puntuacion);
    }

    let sumaPuntuaciones = puntuaciones.reduce((acc, curr) => acc + curr);

    let promedioPuntuaciones = (sumaPuntuaciones / reviews.length).toFixed(1);

    console.log(promedioPuntuaciones);

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
          <span>Basada en {reviews.length} usuarios</span>
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
                value={r.rating}
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
