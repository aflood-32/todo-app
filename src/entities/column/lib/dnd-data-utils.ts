/**
 * Column drag-and-drop data utilities
 *
 * @description Provides type guards and data generators for column drag operations
 */

import { ColumnType } from "@entities/column";

const columnKey = Symbol("column");

export interface ColumnData {
  [columnKey]: true;
  column: ColumnType;
}

const getColumnData = ({ column }: Omit<ColumnData, typeof columnKey>) => {
  return {
    [columnKey]: true,
    column,
  };
};

const isColumnData = (sourceData: unknown): sourceData is ColumnData =>
  typeof sourceData === "object" &&
  sourceData !== null &&
  columnKey in sourceData;

const isDraggingAColumn = ({
  source,
}: {
  source: { data: Record<string | symbol, unknown> };
}): boolean => {
  return isColumnData(source.data);
};

export { getColumnData, isColumnData, isDraggingAColumn };
