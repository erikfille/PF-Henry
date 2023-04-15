import React from 'react'

import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";

export default function TerminosCondiciones() {
  return (
    <>
        <Meta title={"Faqs"} />
        <BreadCrump title="Terminos y Condiciones" />
        <div>
            <h1>Terminos y Condiciones</h1>
        </div> 
        <ul>
            <ol>
                Registro de usuario:
                <p>
                    Para utilizar la aplicación, los usuarios deberán registrarse proporcionando su nombre, dirección de correo electrónico y una contraseña. Al registrarse, los usuarios aceptan los términos y condiciones de la aplicación.
                </p>
            </ol>
            <ol>
                Uso de la aplicación:
                    <p>
                        Los usuarios de PetsAmerica aceptan no utilizar la aplicación con fines ilegales, como el acoso, la discriminación o la difamación. Los usuarios también aceptan no intentar acceder a la información de otros usuarios, utilizar robots o cualquier otro software para acceder o manipular la aplicación, o compartir información de inicio de sesión con terceros.
                    </p>
            </ol>
            <ol>
                Productos:
                    <p>
                        Los usuarios pueden comprar productos a través de la tienda en línea de la aplicación. Los productos se ofrecen "tal cual", y PetsAmerica no ofrece ninguna garantía, expresa o implícita, sobre la calidad, exactitud o adecuación de los productos. Los precios pueden cambiar sin previo aviso.
                    </p>
            </ol>
            <ol>
                Servicios:
                    <p>
                        Los usuarios pueden reservar servicios, como paseos para mascotas o cuidado de mascotas, a través de la aplicación. Los servicios se ofrecen "tal cual", y PetsAmerica no ofrece ninguna garantía, expresa o implícita, sobre la calidad, exactitud o adecuación de los servicios. Los precios pueden cambiar sin previo aviso.
                    </p>
            </ol>
            <ol>
                Propiedad intelectual:
                    <p>
                        La propiedad intelectual de PetsAmerica, incluyendo su nombre, logotipo y cualquier otro contenido o material, son propiedad exclusiva de PetsAmerica. Los usuarios no pueden utilizar, copiar o reproducir cualquier parte de la aplicación sin el consentimiento previo por escrito de PetsAmerica.
                    </p>
            </ol>
            <ol>
                Privacidad:
                    <p>
                        PetsAmerica respeta la privacidad de sus usuarios y protege su información personal de acuerdo con su política de privacidad. La información personal recopilada se utiliza únicamente para los fines establecidos en la política de privacidad.
                    </p>
            </ol>
            <ol>
                Responsabilidad:
                    <p>
                        PetsAmerica no es responsable de ningún daño, directo o indirecto, resultante del uso de la aplicación o de los productos y servicios ofrecidos a través de ella. Los usuarios aceptan indemnizar a PetsAmerica por cualquier reclamación o demanda resultante de su uso de la aplicación.
                    </p>
            </ol>
            <ol>
                Modificaciones a los términos y condiciones:
                    <p>
                        PetsAmerica se reserva el derecho de modificar los términos y condiciones en cualquier momento. Los usuarios serán notificados de cualquier cambio y deberán aceptar los nuevos términos y condiciones para seguir utilizando la aplicación.
                    </p>
            </ol>
            <ol>
                Resolución de conflictos:
                    <p>
                        Cualquier disputa relacionada con la aplicación o los términos y condiciones se resolverá mediante arbitraje vinculante de acuerdo con las reglas de arbitraje comerciales de la Asociación de Arbitraje.
                    </p>
            </ol>
        </ul>
    </>
  )
}

