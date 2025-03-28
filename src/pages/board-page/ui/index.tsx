import styles from "./styles.module.css";

import { AppHeader } from "@widgets/app-header";
import { Board } from "@widgets/board";
import { Column } from "@widgets/column";

const BoardPage = () => {
  return (
    <div className={styles.boardPage}>
      <AppHeader />
      <Board ColumnComponent={Column} />
    </div>
  );
};

export default BoardPage;
