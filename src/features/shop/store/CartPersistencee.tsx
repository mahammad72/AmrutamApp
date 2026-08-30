import {
  useEffect,
  useRef,
} from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks';

import {
  hydrateCart,
} from './cartSlice';

import {
  loadCart,
  saveCart,
} from './cartPersistence';

const CartPersistence =
  () => {
    const dispatch =
      useAppDispatch();

    const cart =
      useAppSelector(
        state => state.cart,
      );

    const hydrated =
      useRef(false);

    // -------------------------------
    // Load persisted cart
    // -------------------------------

    useEffect(() => {
      const restore =
        async () => {
          const saved =
            await loadCart();

          if (saved) {
            dispatch(
              hydrateCart(saved),
            );
          }

          hydrated.current =
            true;
        };

      restore();
    }, [dispatch]);

    // -------------------------------
    // Save cart
    // -------------------------------

    useEffect(() => {
      if (!hydrated.current) {
        return;
      }

      saveCart(cart);
    }, [cart]);

    return null;
  };

export default CartPersistence;