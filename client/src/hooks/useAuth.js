import { create } from "zustand";
import { useModal } from "./useStore";
import axios from "axios";

export const useLogin = create((set, get) => ({
  user: {},
  modal: false,
  signUp: async (userData) => {
    const { receiveToken } = get();
    const modal = useModal.getState().setModalInfo;

    // console.log(userData);
    try {
      let response = await axios.post("/users", userData);
      // console.log(response);
      set((state) => ({ user: response.data.user }));
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      modal(
        "¡Ups... algo ha fallado!",
        err.response.data.error,
        logoutUser,
        []
      );
    }
  },
  loginGoogleUser: async (userData) => {
    const { setModal, receiveToken, logoutUser } = get();
    const modal = useModal.getState().setModalInfo;

    try {
      let response = await axios.post("/users/GoogleLogin", userData);
      // console.log("Post a Users: ", response.data);
      set((state) => ({ user: response.data.user }));
      if (!response.data.user.rol) {
        setModal();
        return;
      }
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      console.log(err);
      modal(
        "¡Ups... algo ha fallado!",
        err.response.data.error,
        logoutUser,
        []
      );
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
    const modal = useModal.getState().setModalInfo;

    try {
      /*
      Se envía el email y password
      Tres posibles respuestas:
      - Success: Se recibe la info del usuario y el token y se setean en el store y se ejecuta receiveToken.
      - Usuario inexistente: se avisa al usuario que no existe el usuario y se abre el modal generico con la opcion de redirigirse a Sign In.
      - Contraseña Incorrecta: se avisa al usuario que la contraseña no coincide.
      */
      let response = await axios.post("/users/login", userData);
      // console.log("Response Login Normal: ", response);
      set((state) => ({ user: response.data.user }));
      receiveToken(response.data.user.token, response.data.user);
    } catch (err) {
      modal(
        "¡Ups... algo ha fallado!",
        err.response.data.error,
        logoutUser,
        []
      );
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
    const modal = useModal.getState().setModalInfo;

    try {
      let token = user.token;
      let response = await axios.put(`/users/${user.id}/role`, { role: role });
      set((state) => ({ user: response.data }));

      // console.log("user with role: ", response.data);

      receiveToken(token, response.data);
    } catch (err) {
      modal(
        "¡Ups... algo ha fallado!",
        err.response.data.error,
        logoutUser,
        []
      );
    }
  },
  receiveToken(token, user) {
    const { loginHi } = get();
    // console.log("receiveToken: ", user);
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

    modal(
      "¡Login Exitoso!",
      `¡Bienvenido a PetsAmérica, ${user.name}!`,
      receiveLogin,
      [user]
    );
  },
  receiveLogin(user) {
    if (user.rol === "admin") {
      window.location.assign("/adminDashboard/users");
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
  checkLogin: async () => {
    const { logoutUser } = get();
    const modal = useModal.getState().setModalInfo;

    try {
      const jwt = localStorage.getItem("token");

      if (jwt) {
        // Si existe un token, lo envío a verificar al back
        let response = await axios.post("/validado", { token: jwt });

        // console.log(response);

        if (response.status !== 200) {
          logoutUser();
        }
      }
    } catch (err) {
      modal(
        "¡Ups... algo ha fallado!",
        err.response.data.error,
        logoutUser,
        []
      );
    }
  },
  setModal: () => {
    set((state) => ({ modal: state.modal ? false : true }));
  },
}));
