import { Task } from "@entities/task/@x";

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
