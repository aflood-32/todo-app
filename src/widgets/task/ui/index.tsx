import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import taskDraggable from "../lib/task-draggable";
import taskDropTarget from "../lib/task-drop-target";
import { TaskProps, TaskState } from "../types";

import TaskDisplay from "./TaskDisplay";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { IDLE_STATE } from "@shared/lib/idle-state";

/**
 * Interactive Task component with drag-and-drop capabilities
 *
 * @param {Object} props - Component properties
 * @param {string} props.taskId - Unique identifier for the task
 * @param {string} props.columnId - ID of the parent column
 * @param {string} props.title - Task content text
 *
 * @returns {React.ReactElement} Renderable task element with DnD behavior
 *
 * @behavior
 * - Makes tasks draggable within and between columns
 * - Shows visual feedback during drag operations
 * - Creates portal-based preview while dragging
 * - Handles drop targeting with edge detection
 *
 */

const Task = ({ id, title, completed, columnId }: TaskProps) => {
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
        task: { id, title, completed },
        columnId,
        setTaskState,
      }),
      taskDropTarget({
        element: inner,
        task: { id, title, completed },
        columnId,
        setTaskState,
      }),
    );
  }, [title, columnId, id, completed]);

  return (
    <>
      <TaskDisplay
        outerRef={outerRef}
        innerRef={innerRef}
        state={taskState}
        id={id}
        title={title}
        completed={completed}
        columnId={columnId}
      />
      {taskState.type === "preview"
        ? createPortal(
            <TaskDisplay
              state={taskState}
              id={id}
              title={title}
              completed={completed}
              columnId={columnId}
            />,
            taskState.container,
          )
        : null}
    </>
  );
};

export default memo(Task);
