import type { Product } from '../types/product';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}?offset=0&limit=10`);
  if (!res.ok) throw new Error('Gagal ambil data');
  const result = (await res.json()) as Product[];
  return result;
};

export const getDetailProducts = async (productId: number) => {
  const res = await fetch(`${BASE_URL}/${productId}`);
  if (!res.ok) throw new Error('Gagal mengambil data produk');
  console.log(res);
  const result = (await res.json()) as Product;
  return result;
};
