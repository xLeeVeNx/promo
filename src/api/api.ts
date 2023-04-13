import { axiosInstance } from './index';

export class Api {
  static async createOrder(body: any): Promise<any> {
    try {
      return await axiosInstance
        .post('/orders/create', {
          ...body,
          amount: +body?.amount,
          client: {
            ...body?.client,
            country: body?.client?.country?.label,
          },
        })
        .then((res) => res.data.orders[0]);
    } catch (e) {
      console.log(e);
      return {};
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
