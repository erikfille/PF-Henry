import { useEffect } from "react";

export default function Comprar({ productos, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //? crea un elemento html script
    const attr_data_preference = document.createAttribute("data-preference-id"); //? crea un nodo atribute

    attr_data_preference.value = data.id; //? le asigna como valor el id que devuelve mp

    //? Agrega atributos al elemento script

    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);
    document.getElementById("form1").appendChild(script); //? Agrega el script como nodo hijo del elemento form
    return () => {
      document.getElementById("form1").removeChild(script); //? Elimina el script como nodo hijo del elemento form
    };
  }, [data]);

  return (
    <div>
      <form id="form1"></form>
    </div>
  );
}
