import React, { useState } from "react";
import DoughType from "../../components/DoughType";
import { SinglePizza } from "../../utils/interfaces";
import styles from "./mainPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { addPizzaToOrder } from "../../store/orderSlice";

type PizzaItemProps = {
  pizza: SinglePizza;
};

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [modifiedPizza, setModifiedPizza] = useState<SinglePizza>(pizza);
  const orderIncludes = (pizza: SinglePizza) => {
    let count = 0;
    order.orderList.map((item) => {
      if (item[0].name === pizza.name) {
        count += item.length - 1;
      }
    });
    return count === 0 ? "" : <div className={styles.counter}>{count}</div>;
  };
  return (
    <div className={styles.pizzaItem}>
      <img src={pizza.imageUrl} alt={pizza.name} />
      <h4>{pizza.name}</h4>
      <DoughType pizza={pizza} setModifiedPizza={setModifiedPizza} />
      <div className={styles.priceWrapper}>
        <div className={styles.price}>от {pizza.price} ₴</div>
        <button
          className={styles.addPizzaButton}
          onClick={() => dispatch(addPizzaToOrder(modifiedPizza))}
        >
          <span>+</span> Добавить {orderIncludes(pizza)}
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
