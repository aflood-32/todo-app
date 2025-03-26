import { useState } from "react";

import { Column } from "@/entities/column";

import styles from "./styles.module.css";

import { boardApi } from "@entities/board";

interface BoardProps {
  ColumnComponent: React.FC<Column>;
}

const Board = ({ ColumnComponent }: BoardProps) => {
  const [columns] = useState(boardApi.get());

  return (
    <main className={styles.board}>
      {columns.map((column) => (
        <ColumnComponent
          key={column.id}
          tasks={column.tasks}
          id={column.id}
          title={column.title}
        />
      ))}
    </main>
  );
};

export default Board;
