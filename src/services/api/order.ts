import { AxiosResponse } from 'axios';
import api  from '../../config/axios';
// Interfaces
import { CreateOrder } from '@/interfaces/product';

interface Products{
  Weight: string
}

export const createOrder = async (data: CreateOrder): Promise<AxiosResponse> => {
  const convertedProducts = convertWeightToNumber(data.Products);

  return await api.post('/orders/create', {DestinationAddress: data. DestinationAddress, Products: convertedProducts});
};


export const cancelOrder = async (id: string | string[] | undefined): Promise<AxiosResponse> => {
  return await api.put(`/orders/${id}/cancelado`);
};


const convertWeightToNumber = (products: Products[]) => {
  return products.map((product) => {
    return {
      ...product,
      Weight: parseFloat(product.Weight)
    };
  });
};

