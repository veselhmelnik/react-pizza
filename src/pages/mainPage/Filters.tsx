import React from "react";
import { TypesOfPizza } from "../../utils/enums";
import styles from "./mainPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { toggleFilter } from "../../store/filtersSlice";

const Filters: React.FC = () => {
  const activeFilter = useAppSelector((state) => state.filters.filterValue);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.filters}>
      {Object.values(TypesOfPizza).map((type, i) => {
        return (
          <li
            onClick={() => dispatch(toggleFilter(i))}
            key={i}
            className={i === activeFilter ? styles.active : ""}
          >
            {type}
          </li>
        );
      })}
    </div>
  );
};

export default Filters;
