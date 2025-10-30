import type { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';
import CardButton from './CartButton';

export default function Card(product: Product) {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      key={product.id}
      onClick={() => handleNavigate(product.id)}
      className='bg-card dark:bg-dark-card rounded-xl shadow cursor-pointer h-full flex flex-col justify-between'
    >
      <img src={product.images[0]} className='rounded-t-xl' />
      <div className='p-2 flex-1 flex flex-col'>
        <div className='flex flex-1 gap-2'>
          <div>
            <h2 className='text-text dark:text-dark-text font-semibold'>
              {product.title}
            </h2>
            <p className='text-sm text-text-muted dark:text-dark-textMuted'>
              {product.category.name}
            </p>
          </div>
          <div>
            <p className='text-text dark:text-dark-text'>${product.price}</p>
          </div>
        </div>
        <div className='flex justify-end'>
          <CardButton {...product} />
        </div>
      </div>
    </div>
  );
}
