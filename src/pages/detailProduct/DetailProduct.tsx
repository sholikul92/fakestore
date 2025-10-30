import { useParams } from 'react-router-dom';
import { useDetailProduct } from '../../hooks/useProduct';
import { useState, useEffect } from 'react';
import CartButton from '../../components/CartButton';

export default function DetailProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const { data } = useDetailProduct(productId);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setCurrentImage(data.images[0]);
    }
  }, [data]);

  return (
    <div className='min-h-screen md:container md:mx-auto md:p-12'>
      {data && (
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex md:flex-col gap-4 order-2 md:order-1'>
            {data.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image-${image}`}
                className='w-16 md:w-96 cursor-pointer'
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
          <img
            src={currentImage!}
            alt={`image-${data.title}`}
            className='w-96 order-1 md:order-2'
          />
          <div className='space-y-2 order-3'>
            <h2 className='text-text dark:text-dark-text text-2xl font-bold'>
              {data.title}
            </h2>
            <p className='text-textMuted dark:text-dark-textMuted'>
              {data.category.name}
            </p>
            <p className='dark:text-dark-text '>{data.description}</p>
            <p className='dark:text-dark-text text-xl font-semibold'>
              $ {data.price}
            </p>
            <CartButton {...data} />
          </div>
        </div>
      )}
    </div>
  );
}
