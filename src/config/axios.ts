import axios from "axios";

const api = axios.create({
  baseURL: "https://prueba-tecninca-backend-qndxoltwga-uc.a.run.app",
});

const token = Buffer.from(`j.p1@gmail.com:123456`, 'utf8').toString('base64')


// Configurar los parámetros del interceptor
api.interceptors.request.use(
  (config) => {
    // Establecer el encabezado Content-Type
    config.headers["Content-Type"] = "application/json";

    // Establecer el encabezado de autorización 
    config.headers["Authorization"] =
      "Basic " + token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
