import { DetailedHTMLProps } from "react";

import styles from "./styles.module.css";

const PrimaryButton = (
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button className={styles.primary_button} {...props}>
      {props.children}
    </button>
  );
};

export default PrimaryButton;
