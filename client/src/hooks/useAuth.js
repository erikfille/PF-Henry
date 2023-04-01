import { create } from "zustand";
import axios from "axios";

export const useLogin = create((set, get) => ({
  user: {},
  modal: false,
  loginUser: async (userData) => {
    const { user, setModal, receiveToken } = get();
    try {
      let response = await axios.post("/users", userData);
      console.log(response.data);

      set((state) => ({ user: response.data }));
      if (!user.rol) {
        setModal();
        return;
      }
      receiveToken();
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
      let response = await axios.put(`/users/${user.id}/role`, role);
      set((state) => ({ user: response.data }));
      receiveToken();
    } catch (err) {
      console.log(err.message);
    }
  },
  receiveToken() {
    const { user } = get();
    userData = {
      id: user.id,
      name: user.name,
      image: user.image,
      email: user.email,
      rol: user.rol,
    };
    var token = user.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    receiveLogin();
  },
  receiveLogin() {
    const { user } = get();

    if (user.rol == "customer") {
      router.push("/tienda");
    } else {
      router.push("/");
    }
  },
  // logoutUser() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  //   axios.defaults.headers.common["Authorization"] = "";
  //   router.push("/login");
  // },
  checkLogin: () => {
    try {
      const jwt = localStorage.getItem("jwt");
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
