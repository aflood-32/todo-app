import { Suspense } from "react";

import Board from "./Board";
import ErrorDisplay from "./ErrorDisplay";
import Loading from "./Loading";
import styles from "./styles.module.css";

import { BoardContextProvider } from "@entities/board";
import { ErrorBoundary } from "@ui/CustomErrorBoundary";
import { AppHeader } from "@widgets/app-header";

const BoardPage = () => {
  return (
    <div className={styles.boardPage}>
      <AppHeader />
      <ErrorBoundary fallback={(error) => <ErrorDisplay error={error} />}>
        <Suspense fallback={<Loading />}>
          <BoardContextProvider>
            <Board />
          </BoardContextProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default BoardPage;
