import { useRef } from "react";

import styles from "./styles.module.css";

import { Column as ColumnType } from "@entities/column/@x";
import { Task } from "@entities/task";

const Column = ({ id, tasks, title }: ColumnType) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.column}>
      <div className={styles.column__header} ref={headerRef}>
        {title}
      </div>
      <ul className={styles.column__body}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            taskId={task.id}
            columnId={id}
          />
        ))}
      </ul>
      <div className={styles.column__footer}>{title}</div>
    </div>
  );
};

export default Column;
