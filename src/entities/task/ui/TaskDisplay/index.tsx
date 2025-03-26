import { TaskDisplayProps, TaskState } from "../../types";

import styles from "./styles.module.css";

const outerClassNames: Partial<Record<TaskState["type"], string>> = {
  "is-dragging-and-left-self": styles.is_hidden,
};

const innerClassNames: Partial<Record<TaskState["type"], string>> = {
  "is-dragging": styles.is_dragging,
};

const TaskDisplay = ({
  title,
  state,
  outerRef,
  innerRef,
}: TaskDisplayProps) => {
  return (
    <li
      ref={outerRef}
      style={{ listStyleType: "none" }}
      className={[styles.task, outerClassNames[state.type]].join(" ")}
    >
      {state.type === "is-over" && state.closestEdge === "top" ? (
        <div
          className={styles.task__backdrop}
          style={{ height: state.dragging.height }}
        />
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
        {title} {state.type}
      </div>

      {state.type === "is-over" && state.closestEdge === "bottom" ? (
        <div
          className={styles.task__backdrop}
          style={{ height: state.dragging.height }}
        />
      ) : null}
    </li>
  );
};

export default TaskDisplay;
