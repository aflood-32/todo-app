import { useCallback, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import columnDraggableHeader from "../lib/column-draggable-header";
import columnDropTarget from "../lib/column-drop-target";
import { ColumnState } from "../types";

import styles from "./styles.module.css";
import TasksList from "./TasksList";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { DragLocationHistory } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { Column as ColumnType, getColumnData } from "@entities/column";
import {
  isDraggingATask,
  isTaskDropTargetData,
  TaskData,
} from "@entities/task";
import { blockBoardPanningAttr } from "@shared/lib/block-board-panning-attr.ts";
import { IDLE_STATE } from "@shared/lib/idle-state";
import { isShallowEqual } from "@shared/lib/is-shallow-equal";
import Backdrop from "@ui/Backdrop";

const innerClassNames: Partial<Record<ColumnState["type"], string>> = {
  "is-dragging": styles.is_dragging,
  "is-task-over": styles.is_task_over,
  "is-column-over": styles.is_column_over,
};

const SCROLL_OFFSET = 1000;

/**
 * Column component for a kanban-style board.
 * Supports drag-and-drop, auto-scrolling, and dynamic task rendering.
 *
 * @param {ColumnType} props - The column data.
 * @param {string} props.id - The unique identifier of the column.
 * @param {Array<Object>} props.tasks - The list of tasks in the column.
 * @param {string} props.title - The title of the column.
 * @returns {JSX.Element} The rendered column.
 */

const Column = ({ id, tasks, title }: ColumnType) => {
  const [columnState, setColumnState] = useState<ColumnState>(IDLE_STATE);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLUListElement | null>(null);

  /**
   * Handles setting the state when a task is dragged over the column.
   *
   * @param {Object} params - The function parameters.
   * @param {TaskData} params.data - The dragged task data.
   * @param {DragLocationHistory} params.location - The drag location history.
   */
  const setIsTaskOver = useCallback(
    ({ data, location }: { data: TaskData; location: DragLocationHistory }) => {
      const innerMost = location.current.dropTargets[0];

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!innerMost) {
        return;
      }

      const isOverChildTask = Boolean(isTaskDropTargetData(innerMost.data));

      const proposed: ColumnState = {
        type: "is-task-over",
        dragging: data.rect,
        isOverChildTask,
      };

      setColumnState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current;
        }
        return proposed;
      });
    },
    [],
  );

  useEffect(() => {
    const header = headerRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const scrollable = scrollableRef.current;

    invariant(outer);
    invariant(scrollable);
    invariant(header);
    invariant(inner);

    const data = getColumnData({ column: { id, tasks, title } });

    return combine(
      columnDraggableHeader({ header, inner, data, setColumnState }),
      columnDropTarget({
        columnId: id,
        outer,
        data,
        setColumnState,
        setIsTaskOver,
      }),
      autoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingATask({ source });
        },
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingATask({ source });
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: SCROLL_OFFSET,
            },
            forBottomEdge: {
              bottom: SCROLL_OFFSET,
            },
          };
        },
      }),
    );
  }, [id, setIsTaskOver, tasks, title]);

  return (
    <div className={styles.column} ref={outerRef}>
      <div
        className={[
          styles.column__inner,
          innerClassNames[columnState.type],
        ].join(" ")}
        ref={innerRef}
        {...{ [blockBoardPanningAttr]: true }}
      >
        <div className={styles.column__header} ref={headerRef}>
          {title}
        </div>
        <ul className={styles.column__body} ref={scrollableRef}>
          <TasksList tasks={tasks} columnId={id} />
          {columnState.type === "is-task-over" &&
          !columnState.isOverChildTask ? (
            <div className="flex-shrink-0 px-3 py-1">
              <Backdrop height={columnState.dragging.height} />
            </div>
          ) : null}
        </ul>
        <div className={styles.column__footer}>{title}</div>
      </div>
    </div>
  );
};

export default Column;
