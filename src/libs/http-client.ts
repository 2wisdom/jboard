import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export default httpClient;
