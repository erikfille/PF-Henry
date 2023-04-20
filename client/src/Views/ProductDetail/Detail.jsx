import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import ProviderDetail from "../../components/ProviderDetail/ProviderDetail";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

import styles from "./Detail.module.css";

export default function Detail() {
  const [productDetail, setProductDetail] = useState({});
  const [providerDetail, setProviderDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const { productId, from } = useParams();

  useEffect(() => {
    // Añade esta llamada para volver al inicio de la página
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    setLoading(true);
    let response = axios
      .get(`/product-detail/${productId}`)
      .then((data) => {
        setProductDetail(data.data);
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"))
      .finally(() => setLoading(false));

    return () => setProductDetail({});
  }, [productId]);

  async function updateComments() {
    let response = await axios
      .get(`/product-detail/${productId}`)
      .then((data) => {
        setProductDetail(data.data);
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));
  }

  return (
    <>
      <Meta title={"Detalle"} />
      <BreadCrump title="Detalle de Producto" />
      <div className="home-wrapper-2 px-5">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <ProductDetail productDetail={productDetail} from={from} />
            {/* <ProviderDetail providerDetail={providerDetail} /> */}
            <ProductReviews
              productDetail={productDetail}
              updateComments={updateComments}
              from={from}
              id="reseñar"
            />
          </div>
        )}
      </div>
    </>
  );
}
