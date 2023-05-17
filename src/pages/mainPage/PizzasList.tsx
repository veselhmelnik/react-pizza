import React from "react";
import styles from "./mainPage.module.css";
import { useAppSelector } from "../../hooks/redux.hook";
import PizzaItem from "./PizzaItem";

const PizzasList: React.FC = () => {
  const pizzas = useAppSelector((state) => state.pizzas);

  if (pizzas.loading) return <div>Loading...</div>;

  return (
    <div className={styles.pizzaList}>
      {pizzas.pizzasList.map((pizza, i) => {
        return <PizzaItem pizza={pizza} key={i} />;
      })}
    </div>
  );
};

export default PizzasList;
