import React, { useEffect, useState } from "react";
import styles from "./doughType.module.css";
import { SinglePizza } from "../utils/interfaces";
import { doughSizes, doughTypes } from "../utils/constants";

type DoughTypeProps = {
  setModifiedPizza: Function;
  pizza: SinglePizza;
};

const DoughType: React.FC<DoughTypeProps> = ({ pizza, setModifiedPizza }) => {
  const [doughtType, setDoughType] = useState(pizza.types[0]);
  const [doughtSize, setDoughSize] = useState(pizza.sizes[0]);

  const onSelectDoughType = (index: number) => {
    setDoughType(index);
  };

  useEffect(() => {
    setModifiedPizza({ ...pizza, types: [doughtType], sizes: [doughtSize] });
  }, [doughtSize, doughtType]);

  const onSelectDoughSize = (index: number) => {
    setDoughSize(index);
  };
  const activeDoughTypeClass = (i: number) => {
    if (!pizza.types.includes(i)) {
      return styles.disabled;
    }
    if (doughtType === i) {
      return styles.active;
    }
  };
  const activeDoughSizeClass = (item: number) => {
    if (!pizza.sizes.includes(item)) {
      return styles.disabled;
    }
    if (doughtSize === item) {
      return styles.active;
    }
  };
  return (
    <div className={styles.doughType}>
      <div className={styles.typeButtons}>
        {doughTypes.map((item, i) => {
          return (
            <button
              onClick={() => onSelectDoughType(i)}
              className={activeDoughTypeClass(i)}
              key={i}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className={styles.sizeButtons}>
        {doughSizes.map((item, i) => {
          return (
            <button
              onClick={() => onSelectDoughSize(item)}
              className={activeDoughSizeClass(item)}
              key={i}
            >{`${item} см.`}</button>
          );
        })}
      </div>
    </div>
  );
};

export default DoughType;
