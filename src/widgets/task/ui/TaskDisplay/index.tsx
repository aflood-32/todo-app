import { TaskDisplayProps, TaskState } from "../../types";

import styles from "./styles.module.css";

import { DeleteTask } from "@features/delete-task";
import { MarkTaskAsComplete } from "@features/mark-task-as-complete";
import { UpdateTask } from "@features/upsert-task";
import Backdrop from "@ui/Backdrop";

const outerClassNames: Partial<Record<TaskState["type"], string>> = {
  "is-dragging-and-left-self": styles.is_hidden,
};

const innerClassNames: Partial<Record<TaskState["type"], string>> = {
  "is-dragging": styles.is_dragging,
};

/**
 * A component that displays a task with drag-and-drop interaction states.
 * Handles visual representations for different drag states.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title/text content of the task.
 * @param {TaskState} props.state - The current drag state of the task.
 * @param {React.RefObject<HTMLLIElement>} props.outerRef - Ref for the outer list item element.
 * @param {React.RefObject<HTMLDivElement>} props.innerRef - Ref for the inner task content element.
 *
 */

const TaskDisplay = ({
  title,
  id,
  columnId,
  completed,
  state,
  outerRef,
  innerRef,
}: TaskDisplayProps) => {
  return (
    <li
      ref={outerRef}
      style={{ listStyleType: "none" }}
      className={[
        styles.task,
        outerClassNames[state.type],
        completed ? styles.completed : undefined,
      ].join(" ")}
    >
      {state.type === "is-over" && state.closestEdge === "top" ? (
        <Backdrop height={state.dragging.height} />
      ) : null}
      <div
        className={[styles.task__body, innerClassNames[state.type]].join(" ")}
        ref={innerRef}
        style={
          state.type === "preview"
            ? {
                width: state.dragging.width,
                height: state.dragging.height,
                transform: "rotate(4deg)",
              }
            : undefined
        }
      >
        <div className={styles.task__mark_as_complete_container}>
          <MarkTaskAsComplete
            columnId={columnId}
            taskId={id}
            completed={completed}
          />
        </div>
        <div className={styles.task__title}>{title}</div>
        <div className={styles.task__edit_container}>
          <UpdateTask
            columnId={columnId}
            taskId={id}
            initialValue={title}
            outerRef={outerRef}
          >
            <DeleteTask columnId={columnId} taskId={id} />
          </UpdateTask>
        </div>
      </div>
      {state.type === "is-over" && state.closestEdge === "bottom" ? (
        <Backdrop height={state.dragging.height} />
      ) : null}
    </li>
  );
};

export default TaskDisplay;
