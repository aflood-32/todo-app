import invariant from "tiny-invariant";

import { TaskState } from "../types";

import { getTaskInitialData, isTaskData } from "./dnd-data-utils";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { IDLE_STATE } from "@shared/lib/idle-state";

/**
 * Configuration for draggable task behavior
 *
 * @interface DraggableArgs
 * @property {HTMLElement} element - Target DOM element
 * @property {string} taskId - Unique task identifier
 * @property {string} title - Display content
 * @property {string} columnId - Parent column reference
 * @property {React.Dispatch<React.SetStateAction<TaskState>>} setTaskState - State control
 */
interface DraggableArgs {
  element: HTMLElement;
  taskId: string;
  title: string;
  columnId: string;
  setTaskState: React.Dispatch<React.SetStateAction<TaskState>>;
}

/**
 * Configures draggable behavior for task elements with custom preview
 *
 * @param {DraggableArgs} config - Drag configuration
 * @param {HTMLElement} config.element - DOM element to make draggable
 * @param {string} config.taskId - Task identifier
 * @param {string} config.title - Task content
 * @param {string} config.columnId - Parent column identifier
 * @param {React.Dispatch<React.SetStateAction<TaskState>>} config.setTaskState - Task state manager
 *
 * @returns {Function} Cleanup function to remove draggable behavior
 *
 * @behavior
 * - Generates custom drag preview using task dimensions
 * - Maintains original offset during drag operations
 * - Updates task state during drag lifecycle:
 *   - 'preview' during preview generation
 *   - 'is-dragging' on drag start
 *   - Resets to idle on drop
 */
const taskDraggable = ({
  element,
  taskId,
  title,
  columnId,
  setTaskState,
}: DraggableArgs) => {
  return draggable({
    element,
    getInitialData: ({ element }) =>
      getTaskInitialData({
        task: { id: taskId, title },
        columnId,
        rect: element.getBoundingClientRect(),
      }),
    onGenerateDragPreview({ nativeSetDragImage, location, source }) {
      const data = source.data;

      invariant(isTaskData(data));

      setCustomNativeDragPreview({
        nativeSetDragImage,
        getOffset: preserveOffsetOnSource({
          element,
          input: location.current.input,
        }),
        render({ container }) {
          setTaskState({
            type: "preview",
            container,
            dragging: element.getBoundingClientRect(),
          });
        },
      });
    },
    onDragStart() {
      setTaskState({ type: "is-dragging" });
    },
    onDrop() {
      setTaskState(IDLE_STATE);
    },
  });
};

export default taskDraggable;
