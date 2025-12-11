import { AXIOS } from "./api";
import type { autor, obra } from "../types";

const API = {
  autor: {
    getAll: () => {
      return AXIOS.get("/autores");
    },

    get: (id: string) => {
      return AXIOS.get(`/autores/${id}`);
    },

    post: (autor: autor) => {
      return AXIOS.post("/autores", autor);
    },

    put: (autor: autor) => {
      return AXIOS.put(`/autores/${autor.id}`, autor);
    },
  },

  obra: {
    getAll: () => {
      return AXIOS.get("/obras");
    },

    get: (id: string) => {
      return AXIOS.get(`/obras/${id}`);
    },

    post: (obra: obra) => {
      return AXIOS.post("/obras", obra);
    },

    put: (obra: obra) => {
      return AXIOS.put(`/obras/${obra.id}`, obra);
    },
  },
};

export default API;
