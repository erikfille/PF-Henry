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

  const { productId } = useParams();

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

  return (
    <div className="home-wrapper-2 ">
      <Meta title={"Detalle"} />
      <BreadCrump title="Detalle de Producto" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <ProductDetail productDetail={productDetail} />
          {/* <ProviderDetail providerDetail={providerDetail} /> */}
          <ProductReviews productDetail={productDetail} id="reseñar" />
        </div>
      )}
    </div>
  );
}
