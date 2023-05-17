import React from 'react';
import styles from './cartButton.module.css';
import shoppingCartIcon from '../assets/images/shoppingCart.svg';
import { Link } from 'react-router-dom';

type CartButtonProps = {
  price: number;
  count: number;
};

const CartButton: React.FC<CartButtonProps> = ({ price, count }) => {
  return (
    <Link to="/cart">
      <div className={styles.cartButton}>
        {price} ₴ <img src={shoppingCartIcon}></img> {count}
      </div>
    </Link>
  );
};

export default CartButton;
