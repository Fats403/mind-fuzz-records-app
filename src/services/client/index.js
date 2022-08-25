import axios from "axios";
import { auth } from "../firebase/client";

const client = axios.create({
  headers: { Accept: "application/json" },
});

client.interceptors.request.use(
  async (config) => {
    let token;

    if (auth?.currentUser) {
      token = await auth.currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetcher = (url) => client.get(url).then((res) => res.data);

export default client;
