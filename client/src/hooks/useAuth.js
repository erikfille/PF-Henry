import { create } from "zustand";
import axios from "axios";

const useLogin = create((set) => ({
  // getProveedor: async () => {
  //   // revisar cuando esten las rutas
  //   try {
  //     let response = await axios.get("/proveedor");
  //     let allProducts = response.data.data;
  //     set((state) => ({ allProducts: allProducts }));
  //     set((state) => ({ filteredProducts: allProducts }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  loginUser(userData) {
    axios
      .post("auth/login", userData)
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          window.alert(data.error.message);
        } else {
          receiveToken(data);
        }
      })
      .catch((err) => {
        window.alert(err.response.data);
      });
  },
  receiveToken(data) {
    user = {
      email: data.data.usuario,
      id: data.data.id,
      rol_id: data.data.rol_id,
      id_odontologo: data.data.id_odontologo,
      permisos: permisos,
      acepto_condiciones: data.data.acepto_condiciones,
    };
    var token = data.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    receiveLogin(user);
  },
  logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    axios.defaults.headers.common["Authorization"] = "";
    router.push("/login");
  },
  receiveLogin(user) {
    if (user.rol_id == "admin") {
      router.push("/home");
    } else {
      router.push("/home");
    }
  },
}));

/*
loginUser({dispatch}, creds) {
    if (creds.email.length > 0 && creds.password.length > 0) {
      axios.post('auth/login', creds).then(response => {
        const data = response.data;
        if ( !data.success){
          dispatch('loginError', data.error.message);
        } else {
          dispatch('receiveToken', data);
        }
      }).catch(err => {
        dispatch('loginError', err.response.data);
      })

    } else {
      dispatch('loginError', 'Something was wrong. Try again');
    }
  },
  receiveToken({dispatch}, data) {
    let user = {};
    var permisos = [];
    if ( data.data.permisos.length > 0 ){
      data.data.permisos.forEach((item, i) => {
          permisos.push(item.permiso_padre.nombre_interno);
          if ( item.permiso_hijo.length > 0 ){
            item.permiso_hijo.forEach((item, i) => {
              permisos.push(item.permiso.nombre_interno);
            });
          }
      });
    }
    user = {
        email: data.data.usuario,
        id: data.data.id,
        rol_id: data.data.rol_id,
        id_odontologo: data.data.id_odontologo,
        permisos: permisos,
        acepto_condiciones: data.data.acepto_condiciones,
    }
    var token = data.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    dispatch('receiveLogin',user);
  },
  logoutUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      axios.defaults.headers.common['Authorization'] = "";
      router.push('/login');
  },
  loginError({commit}, payload) {
      commit('LOGIN_FAILURE', payload);
  },
  receiveLogin({commit}, user) {
      commit('LOGIN_SUCCESS');
      if ( user.rol_id == 1 ){
        router.push('/app/pacientesAdmin/list');
      } else {
        router.push('/app/pacientes/list');
      }
  },
  requestLogin({commit}) {
      commit('LOGIN_REQUEST');
  }

*/
