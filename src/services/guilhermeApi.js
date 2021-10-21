import axios from "axios";

export const guilhermeApi = axios.create({
  baseURL: "http://localhost:8080",
})