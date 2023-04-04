import style from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={style.loader}>
        <img src="src/images/logo-pet.png" alt="Dog Paw Icon" />
      </div>
    </>
  );
};

export default Loader;
