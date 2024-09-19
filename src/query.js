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
    const token = response.data.data.accessToken;
    localStorage.setItem("token", token);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onboardParent = async (data) => {
  const url = "https://itrams-4c9984ff9ef0.herokuapp.com/api/v1/immuno/parent";

  const token = getToken();
  console.log(token);
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("COULD NOT SEND DATA");
    }
    console.log(response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const onboardChild = async ({ data, parentId }) => {
  const url = `https://itrams-4c9984ff9ef0.herokuapp.com/v1/immuno/parent/${parentId}/child`;

  const token = getToken();
  console.log(parentId);
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
  return localStorage.getItem("token");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};
