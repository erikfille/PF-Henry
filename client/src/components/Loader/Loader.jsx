import style from "./Loader.module.css";
import Logo from "../../images/logo-pet.png";

const Loader = () => {
  return (
    <>
      <div className={style.loader}>
        <img src={Logo} alt="Dog Paw Icon" />
      </div>
    </>
  );
};

export default Loader;
