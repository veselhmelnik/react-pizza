import { useEffect } from "react";
import Filters from "./Filters";
import styles from "./mainPage.module.css";
import Sorter from "./Sorter";
import { fetchPizzas } from "../../store/pizzasSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import PizzasList from "./PizzasList";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  
  useEffect(() => {
    dispatch(fetchPizzas(filters));
  }, [filters]);

  return (
    <div className={styles.mainPage}>
      <div className={styles.filtersWrapper}>
        <Filters />
        <Sorter />
      </div>
      <div className={styles.contentWrapper}>
        <h1>Все пиццы</h1>
        <PizzasList />
      </div>
    </div>
  );
};

export default MainPage;
