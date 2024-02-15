// const axios = require('axios')
import axios from "axios";

export const httpClientAdapter = {
  get: async (url: string) => {
    const {data} = await axios.get(url)
    return data;
  },
  post: async(url: string, body: any) => {
    throw new Error('not implemented');
  },
  put: async(url: string, body: any) => {
    throw new Error('not implemented');
  },
  delete: async(url: string, body: any) => {
    throw new Error('not implemented');
  },
}
