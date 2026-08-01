import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const signup = async ({ username, email, password }) => {
  const res = await axios.post(
    `${API_BASE_URL}/auth/signup`,
    { username, email, password },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 201) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const login = async ({ username, password }) => {
  const res = await axios.post(
    `${API_BASE_URL}/auth/login`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  // saveToken(res.data.token);
  return res.data;
};

export const logout = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuth = async () => {
  const res = await axios.get(`${API_BASE_URL}/auth/me`, {
    withCredentials: true,
  });

  if (res.status !== 200) {
    throw new Error("Auth Check failed")
  }

  return res.data
};

export const getParents = async ({ page, limit } = {}) => {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  const res = await axios.get(`${API_BASE_URL}/parents?${params}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getParentById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/parents/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const createParent = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/parents`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 201) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const updateParent = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/parents/${id}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const deleteParent = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/parents/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getChildren = async ({ page, limit, parent } = {}) => {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (parent) params.set("parent", parent);

  const res = await axios.get(`${API_BASE_URL}/children?${params}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getChildById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/children/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const createChild = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/children`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 201) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const updateChild = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/children/${id}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const deleteChild = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/children/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getVaccines = async ({ page, limit } = {}) => {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  const res = await axios.get(`${API_BASE_URL}/vaccines?${params}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getVaccineById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/vaccines/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const createVaccine = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/vaccines`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const updateVaccine = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/vaccines/${id}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const deleteVaccine = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/vaccines/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

// date: 'today' powers the Schedules.jsx / ScheduleDaily.jsx daily view
export const getSchedules = async ({
  page,
  limit,
  status,
  child,
  date,
} = {}) => {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (status) params.set("status", status);
  if (child) params.set("child", child);
  if (date) params.set("date", date);

  const res = await axios.get(`${API_BASE_URL}/schedules?${params}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getSchedulesByChild = async (childId, { status } = {}) => {
  const params = new URLSearchParams();
  if (status) params.set("status", status);

  const res = await axios.get(
    `${API_BASE_URL}/schedules/child/${childId}?${params}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const getDailySummary = async () => {
  const res = await axios(`${API_BASE_URL}/schedules/summary/daily`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const createSchedule = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/schedules`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

// data: { status?, dateOfImmunization?, comment? } — scheduleValidator.js
// requires dateOfImmunization whenever status is set to 'completed'
export const updateSchedule = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/schedules/${id}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 422) {
    const validationErrors = res.data.errors;
    return validationErrors;
  }

  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};

export const deleteSchedule = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/schedules/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    const message =
      res.data?.errors?.[0]?.msg || res.data?.message || "Something went wrong";
    throw new Error(message);
  }
  return res.data;
};
