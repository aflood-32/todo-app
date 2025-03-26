import { TaskState } from "../types";

import {
  getTaskDropTargetData,
  isTaskData,
  isTaskDragging,
} from "./dnd-data-utils";

import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { isShallowEqual } from "@shared/lib/is-shallow-equal";

interface DraggableArgs {
  element: HTMLElement;
  taskId: string;
  title: string;
  columnId: string;
  setTaskState: React.Dispatch<React.SetStateAction<TaskState>>;
}

const taskDropTarget = ({
  element,
  taskId,
  title,
  columnId,
  setTaskState,
}: DraggableArgs) => {
  return dropTargetForElements({
    element,
    getIsSticky: () => true,
    canDrop: isTaskDragging,
    getData: ({ element, input }) => {
      const data = getTaskDropTargetData({
        task: { id: taskId, title },
        columnId,
      });

      return attachClosestEdge(data, {
        element,
        input,
        allowedEdges: ["top", "bottom"],
      });
    },
    onDragEnter({ source, self }) {
      console.log("source", source);

      if (!isTaskData(source.data)) {
        return;
      }

      if (source.data.task.id === taskId) {
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

      if (source.data.task.id === taskId) {
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

      if (source.data.task.id === taskId) {
        setTaskState({ type: "is-dragging-and-left-self" });
        return;
      }

      setTaskState({ type: "idle" });
    },
    onDrop() {
      setTaskState({ type: "idle" });
    },
  });
};

export default taskDropTarget;
