import Interceptor from './Interceptor';

class AppService {
  createPost = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/posts/create`,
        params,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  fetchAllPosts = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.get(
        `/posts/fetch/all`,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  fetchSingleUserPosts = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.get(
        `/posts/fetch/user/all`,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  likePost = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/posts/like`,
        params
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  unlikePost = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/posts/unlike`,
        params
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  commentPost = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/posts/comment`,
        params
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  deletePost = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/posts/delete`,
        params
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  getOtherProfileDetails = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      console.log(params._id);
      const result = await axiosObj.get(
        `/users/${params._id}`,
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  followUser = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/users/follow`,
        params
      );
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log('**********************************',error);
      throw error.response.data;
    }
  };
  unfollowUser = async params => {
    try {
      let axiosObj = await Interceptor.getObject();
      const result = await axiosObj.post(
        `/users/unfollow`,
        params
      );
      return result.data;
    } catch (error) {
      throw error.response.data;
    }
  };
}

export default new AppService();
