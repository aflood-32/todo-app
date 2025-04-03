import { use, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { BoardDispatchContext } from "@entities/board";
import { TaskType } from "@entities/task";

interface CreateTaskArgs {
  columnId: string;
  newTask: Pick<TaskType, "title">;
  onCreateComplete?: () => void;
}

interface UpdateTaskArgs {
  columnId: string;
  taskId: string;
  updatedTask: Pick<TaskType, "title">;
  onUpdateComplete?: () => void;
}

const useCreateTask = () => {
  const dispatch = use(BoardDispatchContext);

  const createTask = useCallback(
    ({ columnId, newTask, onCreateComplete }: CreateTaskArgs) => {
      dispatch({
        type: "ADD_TASK",
        payload: {
          columnId,
          newTask: { id: uuidv4(), title: newTask.title, completed: false },
        },
      });

      if (onCreateComplete) {
        onCreateComplete();
      }
    },
    [dispatch],
  );

  const updateTask = useCallback(
    ({ columnId, updatedTask, onUpdateComplete, taskId }: UpdateTaskArgs) => {
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          columnId,
          updatedTask: { title: updatedTask.title },
          taskId,
        },
      });

      if (onUpdateComplete) {
        onUpdateComplete();
      }
    },
    [dispatch],
  );

  return { createTask, updateTask };
};

export default useCreateTask;
