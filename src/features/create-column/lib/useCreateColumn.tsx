import { use, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { BoardDispatchContext } from "@entities/board";

const useCreateColumn = () => {
  const dispatch = use(BoardDispatchContext);

  const createColumn = useCallback(
    (columnTitle: string, onCreateComplete?: () => void) => {
      dispatch({
        type: "ADD_COLUMN",
        payload: { id: uuidv4(), title: columnTitle, tasks: [] },
      });

      if (onCreateComplete) {
        onCreateComplete();
      }
    },
    [dispatch],
  );

  return { createColumn };
};

export default useCreateColumn;
