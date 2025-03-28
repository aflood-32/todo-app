import { ColumnState } from "../types";

import { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { isColumnData, isDraggingAColumn } from "@entities/column";
import { isDraggingATask, isTaskData, TaskData } from "@entities/task";
import { IDLE_STATE } from "@shared/lib/idle-state.ts";

/**
 * Configuration for column drop target behavior
 *
 * @interface DraggableArgs
 * @property {string} columnId - Current column identifier
 * @property {HTMLElement} outer - DOM element reference
 * @property {Record<string, unknown>} data - Drag payload data
 * @property {React.Dispatch<React.SetStateAction<ColumnState>>} setColumnState - Column state updater
 * @property {Function} setIsTaskOver - Task drag position callback
 */
interface DraggableArgs {
  columnId: string;
  outer: HTMLElement;
  data: Record<string, unknown>;
  setColumnState: React.Dispatch<React.SetStateAction<ColumnState>>;
  setIsTaskOver: ({
    data,
    location,
  }: {
    data: TaskData;
    location: DragLocationHistory;
  }) => void;
}

/**
 * Creates a drop target configuration for column elements with task and column DnD handling
 *
 * @param {Object} config - Configuration object
 * @param {string} config.columnId - ID of the current column
 * @param {HTMLElement} config.outer - Outer column element to make droppable
 * @param {Record<string, unknown>} config.data - Column data payload
 * @param {React.Dispatch<React.SetStateAction<ColumnState>>} config.setColumnState - State setter for column visual states
 * @param {Function} config.setIsTaskOver - Callback when a task card is dragged over
 *
 * @returns {Function} Cleanup function to remove drop target behavior
 *
 * @behavior
 * - Handles both task and column drag operations
 * - Manages visual feedback states during drag
 * - Implements sticky drop targets
 * - Provides proper cleanup on drop/drag leave
 *
 * @interactions
 * - onDragStart: Triggers when dragging starts over column
 * - onDragEnter: Handles task/column enter with state updates
 * - onDropTargetChange: Updates task position during drag
 * - onDragLeave: Resets state when leaving
 * - onDrop: Finalizes drop operation
 */

const columnDropTarget = ({
  columnId,
  outer,
  data,
  setColumnState,
  setIsTaskOver,
}: DraggableArgs) => {
  return dropTargetForElements({
    element: outer,
    getData: () => data,
    canDrop({ source }) {
      return isDraggingATask({ source }) || isDraggingAColumn({ source });
    },
    getIsSticky: () => true,
    onDragStart({ source, location }) {
      if (isTaskData(source.data)) {
        setIsTaskOver({ data: source.data, location });
      }
    },
    onDragEnter({ source, location }) {
      if (isTaskData(source.data)) {
        setIsTaskOver({ data: source.data, location });
        return;
      }
      if (isColumnData(source.data) && source.data.column.id !== columnId) {
        setColumnState({ type: "is-column-over" });
      }
    },
    onDropTargetChange({ source, location }) {
      if (isTaskData(source.data)) {
        setIsTaskOver({ data: source.data, location });
        return;
      }
    },
    onDragLeave({ source }) {
      if (isColumnData(source.data) && source.data.column.id === columnId) {
        return;
      }

      setColumnState(IDLE_STATE);
    },
    onDrop() {
      setColumnState(IDLE_STATE);
    },
  });
};

export default columnDropTarget;
