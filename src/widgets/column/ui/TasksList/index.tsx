import { memo } from "react";

import { Task } from "@entities/task";

interface TasksListProps {
  tasks: { id: string; title: string }[];
  columnId: string;
}

const TasksList = ({ tasks, columnId }: TasksListProps) => {
  return tasks.map((task) => (
    <Task
      key={task.id}
      title={task.title}
      taskId={task.id}
      columnId={columnId}
    />
  ));
};

export default memo(TasksList);
