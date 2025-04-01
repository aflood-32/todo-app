import { Column } from "@entities/column/@x";
import { Task } from "@entities/task/@x";

export type BoardStateContext = Column[];

export type BoardActions =
  | {
      type: "SET_BOARD_DATA";
      payload: Column[];
    }
  | {
      type: "ADD_COLUMN";
      payload: Column;
    }
  | {
      type: "ADD_TASK";
      payload: {
        newTask: Task;
        columnId: string;
      };
    }
  | {
      type: "UPDATE_TASK";
      payload: {
        updatedTask: Partial<Task>;
        columnId: string;
        taskId: string;
      };
    };
