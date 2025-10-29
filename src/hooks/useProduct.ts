import { useQuery } from '@tanstack/react-query';
import { fetchProducts, getDetailProducts } from '../api/product';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useDetailProduct = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getDetailProducts(productId),
    enabled: !!productId && !isNaN(productId),
  });
};
