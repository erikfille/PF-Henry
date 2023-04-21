import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import style from "./UserProfile.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import PetsContainer from "../../components/PetsContainer/PetsContainer";
import { usePets, useUser, useAdmin } from "../../hooks/useStore";

import { useState, useEffect } from "react";

export default function UserProfile() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [modal, setModal] = useState({
    detail: false,
    newPet: false,
  });

  const [selectedPet, setSelectedPet] = useState({});

  const [userInfo, getUserInfo, compras, getCompras] = useUser((state) => [
    state.userInfo,
    state.getUserInfo,
    state.compras,
    state.getCompras,
  ]);

  const [pets, setPetAddModal, setPets] = usePets((state) => [
    state.pets,
    state.setPetAddModal,
    state.setPets,
  ]);

  const [setUserEditModal, usersEditModal] = useAdmin((state) => [
    state.setUserEditModal,
    state.usersEditModal,
  ]);

  useEffect(() => {
    getUserInfo(userId);
    getCompras(userId);
  }, []);

  useEffect(() => {
    setUser(userInfo);
    setPets(userInfo.id_mascota);
  }, [userInfo, userInfo.id_mascota]);

  const setPetDetailModal = (id) => {
    if (id) {
      let filteredPet = pets.find((p) => p.id === id);
      setSelectedPet(filteredPet);
    }
    return modal.newPet ? false : true;
  };

  const toLocalDate = (date) => {
    return date.slice(0,10).split("-").reverse().join("-")
  }

  return (
    <>
      <Meta title={"Perfil"} />
      <BreadCrump title="Perfil" />
      <div className="userProfile-wrapper home-wrapper-2 pb-5">
        <div className="container-xxl">
          <div className="row d-flex flex-column align-items-center">
            <div className={`${style.userContainer} col-10 p-5 my-5`}>
              <div className="d-flex justify-content-end">
                <Link
                  className={style.linkEdit}
                  onClick={() => setUserEditModal(userId)}
                >
                  Editar perfil
                </Link>
              </div>
              <div className="d-flex flex-column flex-lg-row justify-content-center align-content-center flex-wrap">
                {user._id ? (
                  <>
                    <div className="col-12 col-lg-4 d-flex justify-content-center">
                      <div
                        className={`${user.image ? style.imgUser : style.circle}`}
                        style={{ backgroundImage: `url(${user.image})` }}
                      >
                        {!user.image ? (
                          <FaUserAlt
                            style={{ width: "140px", height: "140px" }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-lg-7 text-center">
                      <div className={style.nameContainer}>
                        <p className={style.name}>
                          {user.name} {user.surname}
                        </p>
                      </div>
                      <div
                        className={`${style.fColor} d-flex align-items-center gap-2 mb-4`}
                      >
                        <h4 className="mb-0">Email:</h4>
                        <span>{user.email}</span>
                      </div>
                      {user.address && (
                        <div
                          className={`${style.fColor} d-flex align-items-center gap-2 mb-4`}
                        >
                          <h4 className="mb-0">Dirección:</h4>
                          <span>{user.address}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              className="button"
              style={{ width: "150px" }}
              onClick={() => setPetAddModal()}
            >
              Agregar Mascota
            </button>
            <div className={`${style.petsContainer} col-10 p-5 my-5`}>
              <h4>Mis Mascotas:</h4>
              {typeof pets === "object" && pets.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center align-items-center my-5">
                    <h6 className={style.fColor}>
                      No tienes mascotas agregadas
                    </h6>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`${style.pets} d-flex justify-content-center justify-content-md-start flex-wrap gap-5 py-5`}
                  >
                    <PetsContainer
                      pets={pets}
                      setPetDetailModal={setPetDetailModal}
                      setPetAddModal={setPetAddModal}
                      origin="user"
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`${style.comprasContainer} col-10 p-5 my-5`}>
              <h4>Mis Compras:</h4>
              {compras && compras.length ? (
                <div className="table-responsive-xl">
                  <table className="table table-hover align-middle table-borderless">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="align-middle text-center fs-5"
                        >
                          Imagen
                        </th>
                        <th
                          scope="col"
                          className="align-middle text-center fs-5"
                        >
                          Producto
                        </th>
                        <th
                          scope="col"
                          className="align-middle text-center fs-5"
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          className="align-middle text-center fs-5"
                        >
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map((c) => (
                        <tr key={c._id}>
                          <td
                            colSpan="1"
                            width="150"
                            height="70"
                            className="align-middle text-center"
                          >
                            <img
                              className="img-fluid w-25"
                              width="40"
                              src={c.id_producto.imagen}
                              alt="logo-producto"
                            />
                          </td>
                          <td className="align-middle text-center fw-bold">
                            <Link
                              to={`/productos/${c.id_producto._id}/customer`}
                              className={style.link}
                            >
                              {c.id_producto.titulo}
                            </Link>
                          </td>
                          <td className="align-middle text-center fw-bold">
                            $ {c.id_producto.precio}
                          </td>
                          <td className="align-middle text-center fw-bold">
                            {toLocalDate(c.fechaDeCreacion)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className="d-flex flex-column justify-content-center align-items-center my-5">
                    <h6>Aún no tienes compras</h6>
                    <Link to="/tienda" className={style.link}>
                      Ir a tienda
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
