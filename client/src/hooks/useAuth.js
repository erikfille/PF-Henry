import { create } from "zustand";
import { useModal } from "./useStore";
import axios from "axios";

export const useLogin = create((set, get) => ({
  user: {},
  modal: false,
  signUp: async (userData) => {
    const { receiveToken } = get();
    console.log(userData);
    try {
      let response = await axios.post("/users", userData);
      console.log(response);
      set((state) => ({ user: response.data.user }));
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      console.log(err.message);
    }
  },
  loginGoogleUser: async (userData) => {
    const { setModal, receiveToken } = get();
    try {
      let response = await axios.post("/users/GoogleLogin", userData);
      console.log("Post a Users: ", response.data);
      set((state) => ({ user: response.data.user }));
      if (!response.data.user.rol) {
        setModal();
        return;
      }
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      console.log(err.message);
    }
    // Hago el post al back
    // Recibo el usuario de vuelta
    // Verifico si tiene el rol:
    // - Si no tiene el rol, abro el modal de elegir rol, y hago el put con el nuevo user, agregando el rol y voy a receiveToken con lo que devuelve
    // - Si tiene el rol, voy a receiveToken(data)
    // receiveToken(data);
  },
  loginUser: async (userData) => {
    const { receiveToken } = get();
    try {
      /* 
      Se envía el email y password
      Tres posibles respuestas:
      - Success: Se recibe la info del usuario y el token y se setean en el store y se ejecuta receiveToken.
      - Usuario inexistente: se avisa al usuario que no existe el usuario y se abre el modal generico con la opcion de redirigirse a Sign In.
      - Contraseña Incorrecta: se avisa al usuario que la contraseña no coincide.
      */
      let response = await axios.post("/users/login", userData);
      console.log("Response Login Normal: ", response);
      set((state) => ({ user: response.data.user }));
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      console.log(err.message);
    }
    // Hago el post al back
    // Recibo el usuario de vuelta
    // Verifico si tiene el rol:
    // - Si no tiene el rol, abro el modal de elegir rol, y hago el put con el nuevo user, agregando el rol y voy a receiveToken con lo que devuelve
    // - Si tiene el rol, voy a receiveToken(data)
    // receiveToken(data);
  },
  setUserRole: async (role) => {
    const { user, receiveToken } = get();
    try {
      let token = user.token;
      let response = await axios.put(`/users/${user.id}/role`, { role: role });
      set((state) => ({ user: response.data }));

      console.log("user with role: ", response.data);

      receiveToken(token, response.data);
    } catch (err) {
      console.log(err.message);
    }
  },
  receiveToken(token, user) {
    const { loginHi } = get();
    console.log("receiveToken: ", user);
    let userData = {
      id: user._id || user.id,
      name: user.name,
      image: user.image,
      email: user.email,
      rol: user.rol,
    };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    loginHi(userData);
  },
  loginHi(user) {
    const { receiveLogin } = get();
    const modal = useModal.getState().setModalInfo;
    const modalState = useModal.getState().modalInfoState;

    modal(
      "¡Login Exitoso!",
      `¡Bienvenido a PetsAmérica, ${user.name}!`,
      receiveLogin,
      [user]
    );
  },
  receiveLogin(user) {
    if (user.rol === "admin") {
      window.location.assign("/admin");
    } else if (user.rol === "provider") {
      window.location.assign("/");
    } else {
      window.location.assign("/tienda");
    }
  },
  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    axios.defaults.headers.common["Authorization"] = "";
    window.location.assign("/");
  },
  checkLogin: () => {
    try {
      const jwt = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (jwt) {
        // Si existe un token, lo envío a verificar al back
        axios.get("/user/login");

        // Si el token se valida, guardo user en el store y le doy acceso a su dashboard

        // Si el token no se valida, lo mando al login
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  setModal: () => {
    set((state) => ({ modal: state.modal ? false : true }));
  },
}));
