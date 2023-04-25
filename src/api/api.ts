import { axiosInstance } from './index';
import axios from 'axios';

export class Api {
  static async createOrder(body: any): Promise<any> {
    try {
      const response = await axios.post(' http://localhost:8888/', body);
      console.log(response);
      // const order_id = response.data.orders[0].id;
      // const new_url = `https://checkout.paymtech.kz/pay/${order_id}`;
      // return new_url;
      return response;
    } catch (error: any) {
      console.error('Ошибка:', error.message);
      throw error;
    }
  }

  static async checkOrderStatus(id: string): Promise<any> {
    try {
      return await axiosInstance.get(`/orders/${id}`).then((res) => res.data.orders[0]);
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}
