import React from "react";
import styles from "./layout.module.css";
import pizzaLogo from "../assets/images/pizza-logo.png";
import { Link } from "react-router-dom";
import CartButton from "../components/CartButton";
import { useAppSelector } from "../hooks/redux.hook";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const order = useAppSelector((state) => state.order);
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={pizzaLogo} alt="logo" />
            <div>
              <div className={styles.name}>Hmelnik Pizza</div>
              <span className={styles.subname}>
                самая вкусная пицца во вселенной
              </span>
            </div>
          </div>
          <CartButton price={order.totalPrice} count={order.totalPizzas} />
        </Link>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
