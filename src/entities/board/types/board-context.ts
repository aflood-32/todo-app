import { ColumnType } from "@entities/column/@x";
import { TaskType } from "@entities/task/@x";

export type BoardStateContext = ColumnType[];

export type BoardActions =
  | {
      type: "SET_BOARD_DATA";
      payload: ColumnType[];
    }
  | {
      type: "ADD_COLUMN";
      payload: ColumnType;
    }
  | {
      type: "UPDATE_COLUMN";
      payload: Partial<ColumnType>;
    }
  | {
      type: "ADD_TASK";
      payload: {
        newTask: TaskType;
        columnId: string;
      };
    }
  | {
      type: "UPDATE_TASK";
      payload: {
        updatedTask: Partial<TaskType>;
        columnId: string;
        taskId: string;
      };
    };
