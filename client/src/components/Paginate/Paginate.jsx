import { useProduct } from "../../hooks/useStore";
import styles from "./Paginate.module.css";

export default function Paginate () {
  //... traer los productos del store
  const [storePage, storeMaxPage, handlerNext, handlerPrevious] = useProduct(
    (state) => [
      state.storePage,
      state.storeMaxPage,
      state.handlerNext,
      state.handlerPrevious,
    ]
  );

  console.log(storePage)

  return (
    <div>
      <button
        onClick={() => {
          handlerPrevious();
        }}
      >
        Anterior
      </button>
      <p>
        {storePage} of {storeMaxPage}
      </p>
      <button
        onClick={() => {
          handlerNext();
        }}
      >
        Siguiente
      </button>
    </div>
  );
};
