/**
 * Task drag-and-drop data utilities
 *
 * @description Provides type guards and data generators for task drag operations
 */

import { Task } from "../@x";

const taskKey = Symbol("task");
const taskDropTargetKey = Symbol("task-drop-target");

export interface TaskData {
  [taskKey]: boolean;
  task: Task;
  columnId: string;
  rect: DOMRect;
}

export interface TaskDropTargetData {
  [taskDropTargetKey]: true;
  task: Task;
  columnId: string;
}

const getTaskInitialData = ({
  task,
  rect,
  columnId,
}: Omit<TaskData, typeof taskKey> & { columnId: string }) => ({
  [taskKey]: true,
  task,
  columnId,
  rect,
});

const isTaskData = (sourceData: unknown): sourceData is TaskData =>
  typeof sourceData === "object" &&
  sourceData !== null &&
  taskKey in sourceData;

const isTaskDropTargetData = (sourceData: unknown): sourceData is TaskData =>
  typeof sourceData === "object" &&
  sourceData !== null &&
  taskDropTargetKey in sourceData;

const isDraggingATask = ({
  source,
}: {
  source: { data: Record<string | symbol, unknown> };
}) => {
  return isTaskData(source.data);
};

const getTaskDropTargetData = ({
  task,
  columnId,
}: Omit<TaskDropTargetData, typeof taskDropTargetKey> & {
  columnId: string;
}) => {
  return {
    [taskDropTargetKey]: true,
    task,
    columnId,
  };
};

export {
  getTaskDropTargetData,
  getTaskInitialData,
  isDraggingATask,
  isTaskData,
  isTaskDropTargetData,
};
