import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Checkout.module.css"

export default function CheckOut() {
  return (
    <>
    	<Meta title={"Completar Orden"} />
			<BreadCrump title='Completar Orden' />
      <div className="home-wrapper-2">
        <div className="container-xl mt-5 bg-white">
          <div className="row px-3 pt-3">
          <h1 className="fw-bold">Confirma tu pedido</h1>
          <hr />
          <table className="table">
  <thead>
    <tr>
      <th scope="col">Imagen</th>
      <th scope="col">Producto</th>
      <th scope="col">Precio</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
      <th scope="col"> </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
          </div>

        </div>
      </div>
    </>
  )
}

// img col-2
