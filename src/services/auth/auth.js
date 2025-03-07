//import axios from "axios"

//const api = "auth"

//const auth = {
//    pedirPassword: data => axios.post(`${api}/pedir-password`, data)
//}

//export default auth

import api from "../api";  // Importamos la configuración de Axios

const auth = {
    pedirPassword: data => api.post("/auth/pedir-password", data) // ✅ URL completa asegurada
};

export default auth;