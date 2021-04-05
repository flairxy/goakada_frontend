import axios from "axios";
const ajax = axios.create({
  baseURL: "https://gokada-backend.herokuapp.com/api/",
});

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
ajax.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default ajax;
