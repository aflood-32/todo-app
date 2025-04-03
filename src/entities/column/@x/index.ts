import { TaskType } from "@entities/task/@x";

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}
