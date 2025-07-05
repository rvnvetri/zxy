import axios from "axios";

const api = axios.create({
  
  baseURL: "https://localhost:7279/api",
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// api.interceptors.request.use((config) => {
//   NProgress.start();
//   return config;
// });


// api.interceptors.response.use(
//   (response) => {
//     NProgress.done();
//     return response;
//   },
//   (error) => {
//     NProgress.done();
//     return Promise.reject(error);
//   }
// );


export default api;
