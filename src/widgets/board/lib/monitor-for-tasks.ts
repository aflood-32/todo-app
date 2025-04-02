import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { Column, isColumnData } from "@entities/column";
import {
  isDraggingATask,
  isTaskData,
  isTaskDropTargetData,
} from "@entities/task";

/**
 * @typedef {Object} MonitorForTasksArgs
 * @property {Column[]} columns - Current board columns
 * @property {React.Dispatch<React.SetStateAction<Column[]>>} setColumnsData - State setter
 */
interface MonitorForTasksArgs {
  columns: Column[];
  setColumnsData: (updatedColumns: Column[]) => void;
}

/**
 * Monitors and handles complex task DnD operations between columns
 *
 * @param {MonitorForColumnsArgs} config - Monitoring configuration
 * @param {Column[]} config.columns - Current columns state
 * @param {React.Dispatch<React.SetStateAction<Column[]>>} config.setColumnsData - State updater
 *
 * @returns {Function} Cleanup function to stop monitoring
 *
 * @behavior
 * - Handles three drop scenarios:
 *   1. Reordering within same column (with edge detection)
 *   2. Moving between columns (with precise positioning)
 *   3. Dropping onto empty column area
 * - Maintains data integrity throughout operations
 * - Optimizes state updates with minimal mutations
 *
 * @edgecases
 * - Handles invalid/missing drop targets
 * - Prevents no-op moves
 * - Manages array bounds safely
 */
const monitorForTasks = ({ columns, setColumnsData }: MonitorForTasksArgs) => {
  return monitorForElements({
    canMonitor: isDraggingATask,
    onDrop({ source, location }) {
      const dragging = source.data;

      if (!isTaskData(dragging)) {
        return;
      }

      const innerMost = location.current.dropTargets[0];
      const dropTargetData = innerMost.data;

      const homeColumnIndex = columns.findIndex(
        (column) => column.id === dragging.columnId,
      );
      const homeColumn: Column | undefined = columns[homeColumnIndex];

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!homeColumn) {
        return;
      }

      const taskIndexInHomeColumn = homeColumn.tasks.findIndex(
        (task) => task.id === dragging.task.id,
      );

      // dropping on a task
      if (isTaskDropTargetData(dropTargetData)) {
        const destinationColumnIndex = columns.findIndex(
          (column) => column.id === dropTargetData.columnId,
        );
        const destination = columns[destinationColumnIndex];

        // reordering in home column
        if (homeColumn === destination) {
          const taskFinishIndex = homeColumn.tasks.findIndex(
            (task) => task.id === dropTargetData.task.id,
          );

          // could not find tasks needed
          if (taskIndexInHomeColumn === -1 || taskFinishIndex === -1) {
            return;
          }

          // no change needed
          if (taskIndexInHomeColumn === taskFinishIndex) {
            return;
          }

          const closestEdge = extractClosestEdge(dropTargetData);

          const reordered = reorderWithEdge({
            axis: "vertical",
            list: homeColumn.tasks,
            startIndex: taskIndexInHomeColumn,
            indexOfTarget: taskFinishIndex,
            closestEdgeOfTarget: closestEdge,
          });

          const updated: Column = {
            ...homeColumn,
            tasks: reordered,
          };

          const updatedColumns = Array.from(columns);
          updatedColumns[homeColumnIndex] = updated;

          setColumnsData(updatedColumns);
          return;
        }

        // moving task from one column to another

        // unable to find destination
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!destination) {
          return;
        }

        const indexOfTarget = destination.tasks.findIndex(
          (task) => task.id === dropTargetData.task.id,
        );

        const closestEdge = extractClosestEdge(dropTargetData);
        const finalIndex =
          closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget;

        // remove task from home list
        const homeTasks = Array.from(homeColumn.tasks);
        homeTasks.splice(taskIndexInHomeColumn, 1);

        // insert into destination list
        const destinationTasks = Array.from(destination.tasks);
        destinationTasks.splice(finalIndex, 0, dragging.task);

        const updatedColumns = Array.from(columns);

        updatedColumns[homeColumnIndex] = {
          ...homeColumn,
          tasks: homeTasks,
        };
        updatedColumns[destinationColumnIndex] = {
          ...destination,
          tasks: destinationTasks,
        };

        setColumnsData(updatedColumns);
        return;
      }

      // dropping onto a column, but not onto a task card
      if (isColumnData(dropTargetData)) {
        const destinationColumnIndex = columns.findIndex(
          (column) => column.id === dropTargetData.column.id,
        );
        const destination = columns[destinationColumnIndex];

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!destination) {
          return;
        }

        // dropping on home
        if (homeColumn === destination) {
          // move to last position
          const reordered = reorder({
            list: homeColumn.tasks,
            startIndex: taskIndexInHomeColumn,
            finishIndex: homeColumn.tasks.length - 1,
          });

          const updated: Column = {
            ...homeColumn,
            tasks: reordered,
          };
          const updatedColumns = Array.from(columns);
          updatedColumns[homeColumnIndex] = updated;

          setColumnsData(updatedColumns);
          return;
        }

        // remove task from home list

        const homeTasks = Array.from(homeColumn.tasks);
        homeTasks.splice(taskIndexInHomeColumn, 1);

        // insert into destination list
        const destinationTasks = Array.from(destination.tasks);
        destinationTasks.splice(destination.tasks.length, 0, dragging.task);

        const updatedColumns = Array.from(columns);
        updatedColumns[homeColumnIndex] = {
          ...homeColumn,
          tasks: homeTasks,
        };
        updatedColumns[destinationColumnIndex] = {
          ...destination,
          tasks: destinationTasks,
        };

        setColumnsData(updatedColumns);
        return;
      }
    },
  });
};

export default monitorForTasks;
