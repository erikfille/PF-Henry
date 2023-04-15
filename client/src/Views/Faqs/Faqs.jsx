import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Faqs.module.css";

export default function Faqs() {
    return (
        <div>
            <Meta title={"Faqs"} />
            <BreadCrump title="Faqs" />
            <div className="container-xxl home-wrapper-2 col-12 d-flex flex-column align-items-center">
                <h1 className={`${styles.h1} fw-bold py-5 text-center mx-5`}>
                    Ayuda y preguntas frecuentes para cuidar a tu mascota
                </h1>
                <div className={`${styles.containerFaq} col-12 col-md-10 mb-5 p-md-5`}>
                    <div
                        className="container-xl accordion accordion-flush"
                        id="accordionFlushExample">
                        <div className={`accordion-item my-4 ${styles.questionContainer}`}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button collapsed fw-bold ${styles.button}`}
                                    style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne">
                                    ¿Qué es PetsAmerica?
                                </button>
                            </h2>
                            <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse_in"
                                data-bs-parent="#accordionFlushExample">
                                <div className={`accordion-body ${styles.response}`}>
                                PetsAmerica es un marketplace en línea enfocado en mascotas que ofrece una amplia variedad de productos y servicios para todas las mascotas, incluyendo perros, gatos, pájaros, reptiles y otros animales domésticos.
                                </div>
                            </div>
                        </div>
                        <div className={`accordion-item my-4 ${styles.questionContainer}`}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button collapsed fw-bold ${styles.button}`}
                                    style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTwo">
                                    ¿Cómo puedo comprar productos en PetsAmerica?
                                </button>
                            </h2>
                            <div
                                id="flush-collapseTwo"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample">
                                <div className={`accordion-body ${styles.response}`}>
                                Para comprar productos en PetsAmerica, simplemente navegue por nuestra tienda en línea, seleccione los productos que desea y agréguelos a su carrito de compras. Luego, siga los pasos para completar su pedido y realizar el pago.
                                </div>
                            </div>
                        </div>
                        <div className={`accordion-item my-4 ${styles.questionContainer}`}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button collapsed fw-bold ${styles.button}`}
                                    style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseThree">
                                    ¿Qué tipo de servicios puedo encontrar en PetsAmerica?
                                </button>
                            </h2>
                            <div
                                id="flush-collapseThree"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample">
                                <div className={`accordion-body ${styles.response}`}>
                                En PetsAmerica, ofrecemos una amplia variedad de servicios para mascotas, que incluyen guarderías, paseos, servicios de peluquería y cuidado, servicios de entrenamiento, servicios veterinarios y más. Puede buscar servicios por ubicación y tipo de servicio en nuestra sección de servicios.
                                </div>
                            </div>
                        </div>
                        <div className={`accordion-item my-4 ${styles.questionContainer}`}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button collapsed fw-bold ${styles.button}`}
                                    style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFour"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseFour">
                                    ¿Qué tipo de pagos son aceptados en PetsAmerica?
                                </button>
                            </h2>
                            <div
                                id="flush-collapseFour"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample">
                                <div className={`accordion-body ${styles.response}`}>
                                Aceptamos una amplia variedad de opciones de pago en PetsAmerica, incluyendo tarjetas de crédito y débito, transferencias bancarias y pagos en línea a través de PayPal. Próximamente implementaremos más plataformas de pago.
                                </div>
                            </div>
                        </div>
                        <div className={`accordion-item my-4 ${styles.questionContainer}`}>
                            <h2 className="accordion-header">
                                <button
                                    className={`accordion-button collapsed fw-bold ${styles.button}`}
                                    style={{ backgroundColor: "var(--body_background)", color: "var(--body_color)", borderTopLeftRadius: "7px", borderTopRightRadius: "7px"}}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFive"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseFive">
                                    ¿Cómo puedo contactar al equipo de PetsAmerica?
                                </button>
                            </h2>
                            <div
                                id="flush-collapseFive"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample">
                                <div className={`accordion-body ${styles.response}`}>
                                Si necesita ponerse en contacto con nosotros en PetsAmerica, puede hacerlo a través de nuestro formulario de contacto en línea o por correo electrónico. También puede encontrarnos en las redes sociales, incluyendo Facebook, Twitter e Instagram, para obtener las últimas actualizaciones y noticias.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
