import Meta from "../../components/Meta/Meta";
import BreadCrump from "../../components/BreadCrump/BreadCrump";
import style from "./UserProfile.module.css";
import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import PetsContainer from "../../components/PetsContainer/PetsContainer";
import { usePets, useUser } from "../../hooks/useStore";

// objetos hardcodeados solo para saber si los array tienen algo o estan vacios
// Esto para el renderizado condicional.
// import { pets, compras } from "../../components/PetData/petHelp";
import { useState, useEffect } from "react";

export default function UserProfile() {
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

  const [pets, newPet, getPets, setPetAddModal, petDetailModal] = usePets(
    (state) => [
      state.pets,
      state.getPets,
      state.setPetAddModal,
      state.petDetailModal,
    ]
  );

  useEffect(() => {
    getUserInfo(userId);
    getPets(user.id_mascota);
  }, []);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  // const setPetAddModal = () => {
  //   return modal.newPet ? false : true;
  // };

  const setPetDetailModal = (id) => {
    if (id) {
      let filteredPet = pets.find((p) => p.id === id);
      setSelectedPet(filteredPet);
    }
    return modal.newPet ? false : true;
  };

  return (
    <>
      <Meta title={"Perfil"} />
      <BreadCrump title="Perfil" />
      <div className="userProfile-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row d-flex flex-column align-items-center">
            <div className={`${style.userContainer} col-10 p-5 my-5`}>
              <div className="d-flex justify-content-end">
                <Link to="" className={style.linkEdit}>
                  Editar perfil
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                {user._id ? (
                  <>
                    <div className="col-4">
                      <div className={style.circle}>
                        {/* <FaUserAlt
                          style={{ width: "140px", height: "140px" }}
                        /> */}
                        <img
                          src={user.image}
                          alt="user-imagen"
                          className={style.imgUser}
                        />
                      </div>
                    </div>
                    <div className="col-7">
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
              {pets.length === 0 ? (
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
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`${style.comprasContainer} col-10 p-5 my-5`}>
              <h4>Mis Compras:</h4>
              {compras.length === 0 ? (
                <>
                  <div className="d-flex flex-column justify-content-center align-items-center my-5">
                    <h6>Aún no tienes compras</h6>
                    <Link to="" className={style.link}>
                      Ir a tienda
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${style.pets} d-flex flex-wrap gap-5 py-5`}>
                    {/* renderizar las compras hechas por el cliente */}
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
