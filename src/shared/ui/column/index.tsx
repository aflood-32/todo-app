import { memo } from "react";

import styles from "./styles.module.css";

import { Column as ColumnType } from "@entities/column";
import Task from "@ui/task";

const Column = ({ tasks, title }: ColumnType) => {
  return (
    <div className={styles.column}>
      <div className={styles.column__header}>{title}</div>
      <div className={styles.column__body}>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} />
        ))}
      </div>
      <div className={styles.column__footer}>{title}</div>
    </div>
  );
};

export default memo(Column);
