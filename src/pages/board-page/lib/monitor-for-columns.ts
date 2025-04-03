import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { ColumnType, isColumnData, isDraggingAColumn } from "@entities/column";

/**
 * Configuration for column drag monitoring
 *
 * @interface MonitorForColumnsArgs
 * @property {ColumnType[]} columns - Current columns state
 * @property {React.Dispatch<React.SetStateAction<ColumnType[]>>} setColumnsData - State updater
 */
interface MonitorForColumnsArgs {
  columns: ColumnType[];
  setColumnsData: (updatedColumns: ColumnType[]) => void;
}

/**
 * Monitors and handles column reordering via drag-and-drop
 *
 * @param {MonitorForColumnsArgs} config - Monitoring configuration
 * @param {ColumnType[]} config.columns - Current columns array
 * @param {React.Dispatch<React.SetStateAction<ColumnType[]>>} config.setColumnsData - Columns state setter
 *
 * @returns {Function} Cleanup function to stop monitoring
 *
 * @behavior
 * - Tracks column drag operations exclusively
 * - Calculates new order when dropped on another column
 * - Handles edge cases (invalid drops, same position)
 * - Updates columns state with reordered array
 */
const monitorForColumns = ({
  columns,
  setColumnsData,
}: MonitorForColumnsArgs) => {
  return monitorForElements({
    canMonitor: isDraggingAColumn,
    onDrop({ source, location }) {
      const dragging = source.data;
      const innerMost = location.current.dropTargets[0];

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!isColumnData(dragging) || !innerMost) {
        return;
      }

      const dropTargetData = innerMost.data;

      if (!isColumnData(dropTargetData)) {
        return;
      }

      const startIndex = columns.findIndex(
        (column) => column.id === dragging.column.id,
      );
      const finishIndex = columns.findIndex(
        (column) => column.id === dropTargetData.column.id,
      );

      if (startIndex === -1 || finishIndex === -1) {
        return;
      }

      if (startIndex === finishIndex) {
        return;
      }

      const reordered = reorder({
        list: columns,
        startIndex,
        finishIndex,
      });

      setColumnsData(reordered);
    },
  });
};

export default monitorForColumns;
