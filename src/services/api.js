import axios from "axios";

// Usa la variable de entorno o una URL por defecto (para evitar errores si falta en .env)
const API_BASE_URL = process.env.VUE_APP_API_URL || "https://hunters-back-e4fc0bfa2341.herokuapp.com/api";

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default instance;
