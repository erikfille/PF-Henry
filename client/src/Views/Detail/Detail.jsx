import React, { useState, useEffect } from "react";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProviderDetail from "../../components/ProviderDetail/ProviderDetail";
import axios from "axios";

import styles from "./Detail.module.css";

export default function Detail() {
  const [productDetail, setProductDetail] = useState({});
  const [providerDetail, setProviderDetail] = useState({});

  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`/product-detail/${productId}`)
      .then((data) => {
        console.log(data.data);
        setProductDetail(data.data);
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));

    return () => setProductDetail({});
  }, [productId]);

  return (
    <div>
      <Meta title={"Detalle"} />
      <BreadCrump title="Detalle de Producto" />
      <ProductDetail productDetail={productDetail} />
      <ProviderDetail providerDetail={providerDetail} />
      <ProductReviews productId={productId} />
    </div>
  );
}
