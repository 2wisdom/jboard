import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.API_HOST,
});

export default httpClient;
