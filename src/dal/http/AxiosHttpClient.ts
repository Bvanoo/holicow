import axios from "axios";

export class AxiosHttpClient {

  async get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async getChildren(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

}
