import {
  BoardActions,
  BoardStateContext as BoardStateContextType,
} from "../types/board-context";

const boardReducer = (
  state: BoardStateContextType,
  action: BoardActions,
): BoardStateContextType => {
  switch (action.type) {
    case "SET_BOARD_DATA":
      return action.payload;
    case "ADD_COLUMN":
      return [...state, action.payload];
    case "UPDATE_COLUMN":
      return state.map((column) =>
        column.id === action.payload.id
          ? { ...column, ...action.payload }
          : column,
      );
    case "ADD_TASK":
      return state.map((column) => {
        if (column.id === action.payload.columnId) {
          return {
            ...column,
            tasks: [...column.tasks, action.payload.newTask],
          };
        }
        return column;
      });
    case "UPDATE_TASK":
      return state.map((column) => {
        if (column.id === action.payload.columnId) {
          return {
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id === action.payload.taskId) {
                return {
                  ...task,
                  ...action.payload.updatedTask,
                };
              }
              return task;
            }),
          };
        }
        return column;
      });
    case "DELETE_TASK":
      return state.map((column) => {
        if (column.id === action.payload.columnId) {
          return {
            ...column,
            tasks: column.tasks.filter(
              (task) => task.id !== action.payload.taskId,
            ),
          };
        }
        return column;
      });
    default:
      return state;
  }
};

export default boardReducer;
