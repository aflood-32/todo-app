import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import { IDLE_STATE } from "../lib/idle-state";
import taskDraggable from "../lib/task-draggable";
import taskDropTarget from "../lib/task-drop-target";
import { TaskProps, TaskState } from "../types";

import TaskDisplay from "./TaskDisplay";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

const Task = ({ title, taskId, columnId }: TaskProps) => {
  const [taskState, setTaskState] = useState<TaskState>(IDLE_STATE);

  const outerRef = useRef<HTMLLIElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    invariant(inner && outer);

    return combine(
      taskDraggable({
        element: inner,
        taskId,
        columnId,
        title,
        setTaskState,
      }),
      taskDropTarget({
        element: inner,
        taskId,
        columnId,
        title,
        setTaskState,
      }),
    );
  }, [taskId, title, columnId]);

  return (
    <>
      <TaskDisplay
        outerRef={outerRef}
        innerRef={innerRef}
        state={taskState}
        title={title}
      />
      {taskState.type === "preview"
        ? createPortal(
            <TaskDisplay state={taskState} title={title} />,
            taskState.container,
          )
        : null}
    </>
  );
};

export default Task;
