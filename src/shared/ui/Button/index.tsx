import { DetailedHTMLProps } from "react";

import styles from "./styles.module.css";

const Button = (
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button type="button" className={styles.button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
