import { useParams } from 'react-router-dom';
import { useDetailProduct } from '../../hooks/useProduct';
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

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
    <div className='min-h-screen container mx-auto p-12'>
      {data && (
        <div className='flex gap-4'>
          <div className='flex flex-col gap-4'>
            {data.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image-${image}`}
                className='w-96 cursor-pointer'
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
          <img
            src={currentImage!}
            alt={`image-${data.title}`}
            className='w-96'
          />
          <div className='space-y-2'>
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
            <button className='flex items-center gap-2 text-dark-text bg-accent hover:bg-accentHover dark:bg-dark-accent px-4  py-2 rounded-xl cursor-pointer'>
              <AiOutlineShoppingCart />
              Add Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
