import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
const queryClient = new QueryClient();
export default queryClient;

export const Signup = async (data) => {
  const url =
    "https://itrams-4c9984ff9ef0.herokuapp.com/api/v1/auth/student/register";

  try {
    const response = await axios.post(url, data);

    if (response.status === 403) {
      throw new Error("User exists already!");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const Login = async (data) => {
  const url = "https://itrams-4c9984ff9ef0.herokuapp.com/api/v1/auth/login";

  try {
    const response = await axios.post(url, data);

    if (response.status === 403) {
      throw new Error("User exists already!");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onboardParent = async (data) => {
  const url = "https://itrams-4c9984ff9ef0.herokuapp.com/v1/immuno/parent/";

  try {
    const response = await axios.post(url, data);

    if (response.status !== 200) {
      throw new Error("COULD NOT SEND DATA");
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onboardChild = async ({ data, parentId }) => {
  const url = `https://itrams-4c9984ff9ef0.herokuapp.com/v1/immuno/parent/${parentId}/child`;

  try {
    const response = await axios.post(url, { data });

    if (response.status !== 200) {
      throw new Error("COULD NOT SEND DATA");
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const removeToken = () => {
  return (localStorage.removeItem("token"));
};
