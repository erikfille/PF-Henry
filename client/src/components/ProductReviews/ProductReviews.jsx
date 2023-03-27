import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import styles from "./ProductReviews.module.css";
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
		<div className=''>
			<h1 className='ms-3 ms-sm-5 fw-bold'>Reseñas</h1>
			<div className='container-md bg-white mt-5'>
				<h1 className='fw-bold'>Reseñas de Clientes</h1>
				<div className='d-flex align-items-center'>
					<ReactStars
						count={5}
						size={20}
						value={averageReviews}
						edit={false}
						activeColor='#ffd700'
						className={`d-inline-flex me-3 ${styles.stars}`}
					/>
					<span className={`${styles.span} fw-bold`}>Basada en {reviews.length} usuarios</span>
				</div>
				<hr />
				<div className=''>
					<h3 className='fw-bold fs-5'>Escribe una reseña</h3>
					<p className={`${styles.span} fw-bold mb-1`}>Calificación</p>
					<ReactStars count={5} size={20} value={qualify} edit={true} activeColor='#ffd700' />
					<p className={`${styles.span} fw-bold mt-2`}>Reseña</p>
					<textarea
						className={`form-control ${styles.textReview}`}
						type='text'
						id='exampleFormControlTextarea1'
						name='review'
						value={review}
						rows='3'
						onChange={handleInputChange}
						placeholder='Escribe aquí tu reseña'></textarea>
				</div>
				<div className='mt-5'>
					{reviews.map((r) => (
						<div className='container-xl mt-5'>
							<div className='d-sm-flex align-items-end mt-0'>
								<h1 className='fw-bold fs-3 me-3'>{r.usuario}</h1>
								<ReactStars
									count={5}
									size={20}
									value={r.rating}
									edit={false}
									activeColor='#ffd700'
									className={styles.stars}
								/>
							</div>
							<div>
								<span className={`${styles.span}`}>{r.fecha}</span>
								<p className={`${styles.span} pt-3`}>{r.comentario}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
