import { axiosInstance } from './index';

export class Api {
  static async createOrder(body: any): Promise<any> {
    try {
      const response = await axiosInstance.post('/orders/create', body);
      const order_id = response.data.orders[0].id;
      const new_url = `https://checkout.paymtech.kz/pay/${order_id}`;
      return new_url;
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

  static async getOrders(): Promise<any> {
    const token = btoa('maslovai:Z2xoq8DT8FYHWg2C');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    };
    try {
      return await axiosInstance
        .get(`/orders`, {
          headers,
        })
        .then((res) => res.data.orders);
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}
