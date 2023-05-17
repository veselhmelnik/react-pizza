import React from "react";
import styles from "./cartPage.module.css";
import shopingCartImg from "../../assets/images/shopping-cart.png";
import shoppingCartIconBlack from "../../assets/images/shoppingCartBlack.svg";
import trashIcon from "../../assets/images/trash.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { SinglePizza } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import xButton from "../../assets/images/x-button.svg";
import negativeButton from "../../assets/images/negative-button.svg";
import path from "../../assets/images/path.svg";
import {
  addPizzaToOrder,
  clearOrder,
  removeExactTypeOfPizzaFromOrder,
  removePizzaFromOrder,
} from "../../store/orderSlice";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const backToPrevPage = () => {
    navigate(-1);
  };

  const item = (pizza: SinglePizza, amount: number) => {
    const doughArray = ["тонкое тесто", "толстое тесто"];
    return (
      <>
        <img src={pizza.imageUrl} alt={pizza.name} />
        <div className={styles.pizzaInfo}>
          <h3>{pizza.name}</h3>
          <span>{`${doughArray[pizza.types[0]]}, ${pizza.sizes} см.`}</span>
        </div>
        <div className={styles.amount}>
          <button
            onClick={() => dispatch(removeExactTypeOfPizzaFromOrder(pizza))}
          >
            <img src={negativeButton} />
          </button>
          <span>{amount - 1}</span>
          <button onClick={() => dispatch(addPizzaToOrder(pizza))}>+</button>
        </div>
        <div className={styles.price}>{pizza.price} ₴</div>
        <button
          className={styles.deleteItemButton}
          onClick={() => dispatch(removePizzaFromOrder(pizza))}
        >
          <img src={xButton} />
        </button>
      </>
    );
  };

  if (order.orderList.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Корзина пустая</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
          пиццу, перейди на главную страницу.
        </p>
        <img src={shopingCartImg} alt="shopping cart" />
        <button onClick={backToPrevPage}>Вернуться назад</button>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartHeader}>
        <h2>
          <img src={shoppingCartIconBlack}></img>Корзина
        </h2>
        <div className={styles.trash} onClick={() => dispatch(clearOrder())}>
          <img src={trashIcon} />
          Очистить корзину
        </div>
      </div>
      <div className={styles.cartBody}>
        {order.orderList.map((pizza) => {
          return <li key={pizza[0].id}>{item(pizza[0], pizza.length)}</li>;
        })}
        <div className={styles.total}>
          <div>
            Всего пицц: <span>{order.totalPizzas} шт.</span>
          </div>
          <div className={styles.totalPrice}>
            Сумма заказа: <span>{order.totalPrice} ₴</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.backButton} onClick={backToPrevPage}>
            <img src={path} /> Вернуться назад
          </button>
          <button
            className={styles.payButton}
            onClick={() => alert("Заказ оплачен")}
          >
            Оплатить сейчас
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
