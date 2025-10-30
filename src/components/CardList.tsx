import { OrbitProgress } from 'react-loading-indicators';
import { useProducts } from '../hooks/useProduct';
import Card from './Card';

export default function CardList() {
  const { data, isLoading } = useProducts();

  if (isLoading)
    return (
      <div className='w-full flex justify-center items-center'>
        <OrbitProgress color='#4e31cc' size='medium' text='' textColor='' />
      </div>
    );

  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
      {data && data.map((product) => <Card {...product} key={product.id} />)}
    </div>
  );
}
