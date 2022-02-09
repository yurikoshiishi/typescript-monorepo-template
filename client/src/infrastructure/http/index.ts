import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
});

export class HttpClient {
  async get<T>(url: string): Promise<T> {
    const res = await axios.get<T>(url);

    return res.data;
  }

  async post<T, U = any>(url: string, body: U): Promise<T> {
    const res = await axios.post(url, body);

    return res.data;
  }

  async put<T, U = any>(url: string, body: U): Promise<T> {
    const res = await axios.put(url, body);

    return res.data;
  }

  async delete<T>(url: string): Promise<T> {
    const res = await axios.delete(url);

    return res.data;
  }
}

export const httpClient = new HttpClient();
