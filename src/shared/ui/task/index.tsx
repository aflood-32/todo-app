import { memo } from "react";

import styles from "./styles.module.css";

interface TaskProps {
  title: string;
}

const Task = ({ title }: TaskProps) => {
  return <li className={styles.task}>{title}</li>;
};

export default memo(Task);
