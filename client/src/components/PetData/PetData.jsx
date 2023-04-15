import style from "./PetData.module.css";
import { TbPawFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { usePets } from "../../hooks/useStore";

const PetData = (props) => {
  const fecha = new Date(props.nac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getUTCFullYear().toString();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  const [setPetDetailModal] = usePets((state) => [state.setPetDetailModal]);

  const { id, name, especie, nac, imagen, historial, descripcion } = props;

  return (
    <>
      <div className={`${style.pet} d-flex gap-80`}>
        <div className="d-none d-md-flex flex-column align-items-center gap-3">
          <div
            className={props.imagen ? style.imgMascota : style.circle}
            style={{ backgroundImage: `url(${props.imagen})` }}
          >
            {!props.imagen && (
              <TbPawFilled style={{ width: "80px", height: "80px" }} />
            )}
          </div>
          <button className={style.info}>Editar</button>
        </div>
        <div className={style.detail}>
          <p className={`${style.name} mb-0`}>{props.name}</p>
          <p className={`${style.especie} mb-0`}>{props.especie}</p>
          <p className={`${style.nac} mb-0`}>{fechaFormateada}</p>
          <button
            onClick={() =>
              setPetDetailModal({
                id,
                name,
                especie,
                nac,
                imagen,
                historial,
                descripcion,
              })
            }
            className={style.info}
          >
            + Información
          </button>
        </div>
      </div>
    </>
  );
};

export default PetData;
