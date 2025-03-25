import { useState } from "react";

import styles from "./styles.module.css";

import { boardApi } from "@entities/board";
import Column from "@ui/column";

const Board = () => {
  const [columns] = useState(boardApi.get());

  return (
    <main className={styles.board}>
      {columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </main>
  );
};

export default Board;
