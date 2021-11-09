import Interceptor from './Interceptor';

class AuthService {
  registerUser = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/auth/signup`,
        params,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  signinUser = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/auth/signin`,
        params,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
}

export default new AuthService();
