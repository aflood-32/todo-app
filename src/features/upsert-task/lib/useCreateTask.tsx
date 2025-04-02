import { use, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { BoardDispatchContext } from "@entities/board";
import { TaskType } from "@entities/task";

interface CreateTaskArgs {
  columnId: string;
  newTask: Pick<TaskType, "title">;
  onCreateComplete?: () => void;
}

const useCreateTask = () => {
  const dispatch = use(BoardDispatchContext);

  const createTask = useCallback(
    ({ columnId, newTask, onCreateComplete }: CreateTaskArgs) => {
      dispatch({
        type: "ADD_TASK",
        payload: { columnId, newTask: { id: uuidv4(), title: newTask.title } },
      });

      if (onCreateComplete) {
        onCreateComplete();
      }
    },
    [dispatch],
  );

  return { createTask };
};

export default useCreateTask;
