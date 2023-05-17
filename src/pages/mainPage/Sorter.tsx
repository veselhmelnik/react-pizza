import React, { useEffect, useState } from "react";
import styles from "./mainPage.module.css";
import sortingArrow from "../../assets/images/sortingArrow.svg";
import { sortingList } from "../../utils/enums";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { toggleSort } from "../../store/filtersSlice";

const Sorter: React.FC = () => {
  const activeSorter = useAppSelector((state) => state.filters.sortingValue);
  const [isDropListOpen, setIsDropListOpen] = useState(false);
  const dropListRef = React.createRef<HTMLDivElement>();

  const toggleDropList = () => {
    setIsDropListOpen(!isDropListOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent): void => {
      if (
        isDropListOpen &&
        dropListRef.current &&
        !dropListRef.current.contains(e.target as Node)
      ) {
        setIsDropListOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isDropListOpen]);

  return (
    <div ref={dropListRef} onClick={toggleDropList} className={styles.sorter}>
      <img src={sortingArrow}></img>Сортировка по:{" "}
      <span>{sortingList[activeSorter as keyof typeof sortingList]}</span>
      <DropList isDropListOpen={isDropListOpen} />
    </div>
  );
};

type dropListProps = {
  isDropListOpen: boolean;
};

const DropList: React.FC<dropListProps> = ({ isDropListOpen }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.dropList} hidden={!isDropListOpen}>
      {Object.values(sortingList).map((item, i) => {
        return (
          <li
            onClick={() => dispatch(toggleSort(Object.keys(sortingList)[i]))}
            key={i}
          >
            {item}
          </li>
        );
      })}
    </div>
  );
};

export default Sorter;
