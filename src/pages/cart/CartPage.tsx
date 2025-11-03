import useActiveCart from "../../hooks/useActivecart";
import useCartStore from "../../store/cartStore";
import { useShallow } from "zustand/shallow";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";

export default function CartPage() {
  const carts = useActiveCart();
  const { increaseQuantityItem, decreaseQuantityItem, deleteItem } = useCartStore(
    useShallow((state) => ({
      increaseQuantityItem: state.increaseQuantityItem,
      decreaseQuantityItem: state.decreaseQuantityItem,
      deleteItem: state.deleteItem,
    }))
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(
      carts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalPrice;
      }, 0)
    );
  }, [carts]);

  return (
    <div className='mx-auto p-8'>
      <div className='grid grid-cols-[0.2fr_2fr_1fr_1fr] px-6 py-3 border-b text-textMuted dark:text-dark-textMuted font-medium text-sm'>
        <div></div>
        <div>Product</div>
        <div className='text-center'>Quantity</div>
        <div className='text-right'>Price</div>
      </div>

      {carts.map((item) => (
        <div key={item.id} className='grid grid-cols-[0.2fr_2fr_1fr_1fr] items-center px-6 py-4 border-b border-b-textMuted last:border-none'>
          <TiDeleteOutline className='cursor-pointer text-red-500 text-2xl' onClick={() => deleteItem(item.id)} />

          <div className='flex items-center gap-4'>
            <img src={item.imageUrl} alt={item.title} className='w-14 h-14 rounded-lg object-cover' />
            <div>
              <p className='font-medium text-text dark:text-dark-text'>{item.title}</p>
              <p className='text-sm text-textMuted dark:text-dark-textMuted'>Product ID: {item.id}</p>
            </div>
          </div>

          <div className='flex justify-center items-center gap-3'>
            <button
              onClick={() => decreaseQuantityItem(item.id)}
              className='w-7 h-7 rounded-full border flex items-center justify-center text-textMuted dark:text-dark-textMuted hover:bg-gray-100'
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className='w-6 text-text dark:text-dark-text text-center font-medium'>{String(item.quantity).padStart(2, "0")}</span>
            <button
              onClick={() => increaseQuantityItem(item.id)}
              className='w-7 h-7 rounded-full border flex items-center justify-center text-textMuted dark:text-dark-textMuted hover:bg-gray-100'
            >
              +
            </button>
          </div>

          <div className='text-right font-medium text-text dark:text-dark-text'>${item.totalPrice.toFixed(2)}</div>
        </div>
      ))}

      <div className='mt-8 flex justify-end px-8'>
        <div className='w-full flex justify-between font-semibold text-lg text-text dark:text-dark-text'>
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className='mt-8 flex justify-between'>
        <Link to='/' aria-label='Button back to shop '>
          <button className='cursor-pointer px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800'>Back to Shop</button>
        </Link>
        <button className='px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700'>Checkout</button>
      </div>
    </div>
  );
}
