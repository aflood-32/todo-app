import { TaskState } from "../types";

import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { isDraggingATask, isTaskData, TaskType } from "@entities/task";
import { getTaskDropTargetData } from "@entities/task/lib/dnd-data-utils.ts";
import { IDLE_STATE } from "@shared/lib/idle-state";
import { isShallowEqual } from "@shared/lib/is-shallow-equal";

/**
 * Configuration for task drop target behavior
 *
 * @interface DraggableArgs
 * @property {HTMLElement} element - Target DOM element
 * @property {string} taskId - Current task identifier
 * @property {string} title - Task content
 * @property {string} columnId - Parent column reference
 * @property {React.Dispatch<React.SetStateAction<TaskState>>} setTaskState - State control
 */
interface DraggableArgs {
  element: HTMLElement;
  task: TaskType;
  columnId: string;
  setTaskState: React.Dispatch<React.SetStateAction<TaskState>>;
}

/**
 * Configures drop target behavior for task elements with edge detection
 *
 * @param {DraggableArgs} config - Drop target configuration
 * @param {HTMLElement} config.element - DOM element to make droppable
 * @param {string} config.taskId - Current task identifier (for self-filtering)
 * @param {string} config.title - Task content
 * @param {string} config.columnId - Parent column identifier
 * @param {React.Dispatch<React.SetStateAction<TaskState>>} config.setTaskState - Task state manager
 *
 * @returns {Function} Cleanup function to remove drop target behavior
 *
 * @behavior
 * - Creates sticky drop target with top/bottom edge detection
 * - Filters out self-drops (same taskId)
 * - Manages visual feedback during drag operations:
 *   - 'is-over' state with closest edge
 *   - 'is-dragging-and-left-self' when exiting self
 *   - Automatic state reset on drop/leave
 * - Optimizes state updates with shallow equality checks
 */
const taskDropTarget = ({
  element,
  task,
  columnId,
  setTaskState,
}: DraggableArgs) => {
  return dropTargetForElements({
    element,
    getIsSticky: () => true,
    canDrop: isDraggingATask,
    getData: ({ element, input }) => {
      const data = getTaskDropTargetData({
        task,
        columnId,
      });

      return attachClosestEdge(data, {
        element,
        input,
        allowedEdges: ["top", "bottom"],
      });
    },
    onDragEnter({ source, self }) {
      if (!isTaskData(source.data)) {
        return;
      }

      if (source.data.task.id === task.id) {
        return;
      }

      const closestEdge = extractClosestEdge(self.data);

      if (!closestEdge) {
        return;
      }

      setTaskState({
        type: "is-over",
        dragging: source.data.rect,
        closestEdge,
      });
    },
    onDrag({ source, self }) {
      if (!isTaskData(source.data)) {
        return;
      }

      if (source.data.task.id === task.id) {
        return;
      }

      const closestEdge = extractClosestEdge(self.data);

      if (!closestEdge) {
        return;
      }

      const proposed: TaskState = {
        type: "is-over",
        dragging: source.data.rect,
        closestEdge,
      };

      setTaskState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current;
        }

        return proposed;
      });
    },
    onDragLeave({ source }) {
      if (!isTaskData(source.data)) {
        return;
      }

      if (source.data.task.id === task.id) {
        setTaskState({ type: "is-dragging-and-left-self" });
        return;
      }

      setTaskState(IDLE_STATE);
    },
    onDrop() {
      setTaskState(IDLE_STATE);
    },
  });
};

export default taskDropTarget;
