import { useEffect, useRef } from "react";
import style from './UploadWidget.module.css';

export default function UploadWidget(props) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "efille",
        uploadPreset: "Pet App Products",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          props.onUpload(result.info.secure_url);
        }
      }
    );
  }, [props]);

  return (
    <div className="widgetContainer">
      <span onClick={() => widgetRef.current.open()} className={`${style.selectImg} link-opacity-100-hover`}>Seleccionar Imagen</span>
    </div>
  );
}
