import { use, useCallback } from "react";

import { BoardDispatchContext } from "@entities/board";

const useUpdateColumn = () => {
  const dispatch = use(BoardDispatchContext);

  const updateColumnTitle = useCallback(
    (columnId: string, columnTitle: string) => {
      dispatch({
        type: "UPDATE_COLUMN",
        payload: { id: columnId, title: columnTitle },
      });
    },
    [dispatch],
  );

  return { updateColumnTitle };
};

export default useUpdateColumn;
