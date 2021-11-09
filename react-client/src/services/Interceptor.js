import axios from "axios";

class Interceptor {
  getObject = async () => {
    try {
      let axiosObj = axios;
      const token = localStorage.getItem('jwt')
      const user = localStorage.getItem('user')
      axiosObj.interceptors.request.use((config) => {
        if (user && token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
      });

      return axiosObj;
    } catch (error) {
      // console.log(error);
    }
  };
}

export default new Interceptor();
