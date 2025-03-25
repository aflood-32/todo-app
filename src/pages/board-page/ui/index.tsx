import styles from "./styles.module.css";

import { AppHeader } from "@widgets/app-header";
import { Board } from "@widgets/board";

const BoardPage = () => {
  return (
    <div className={styles.boardPage}>
      <AppHeader />
      <Board />
    </div>
  );
};

export default BoardPage;
