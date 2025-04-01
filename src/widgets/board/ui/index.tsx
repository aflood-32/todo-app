import { use, useCallback, useEffect, useRef } from "react";
import { bindAll } from "bind-event-listener";
import invariant from "tiny-invariant";

import monitorForColumns from "../lib/monitor-for-columns";
import monitorForTasks from "../lib/monitor-for-tasks";

import styles from "./styles.module.css";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { BoardDispatchContext, BoardStateContext } from "@entities/board";
import { Column, isDraggingAColumn } from "@entities/column";
import { isDraggingATask } from "@entities/task";
import { CreateColumn } from "@features/create-column";
import { blockBoardPanningAttr } from "@shared/lib/block-board-panning-attr";

interface BoardProps {
  ColumnComponent: React.FC<Column>;
}

const SCROLL_OFFSET = 1000;

const Board = ({ ColumnComponent }: BoardProps) => {
  const columns = use(BoardStateContext);
  const dispatch = use(BoardDispatchContext);

  const setColumnsData = useCallback(
    (updatedColumns: Column[]) => {
      dispatch({ type: "SET_BOARD_DATA", payload: updatedColumns });
    },
    [dispatch],
  );

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollable = scrollableRef.current;

    invariant(scrollable);

    return combine(
      monitorForTasks({ columns, setColumnsData }),
      monitorForColumns({ columns, setColumnsData }),
      autoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingATask({ source }) || isDraggingAColumn({ source });
        },
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        canScroll({ source }) {
          return isDraggingATask({ source }) || isDraggingAColumn({ source });
        },
        getOverflow() {
          return {
            forLeftEdge: {
              top: SCROLL_OFFSET,
              left: SCROLL_OFFSET,
              bottom: SCROLL_OFFSET,
            },
            forRightEdge: {
              top: SCROLL_OFFSET,
              right: SCROLL_OFFSET,
              bottom: SCROLL_OFFSET,
            },
          };
        },
      }),
    );
  }, [columns, setColumnsData]);

  useEffect(() => {
    let cleanupActive: CleanupFn | null = null;
    const scrollable = scrollableRef.current;
    invariant(scrollable);

    function begin({ startX }: { startX: number }) {
      let lastX = startX;

      const cleanupEvents = bindAll(
        window,
        [
          {
            type: "pointermove",
            listener(event) {
              const currentX = event.clientX;
              const diffX = lastX - currentX;

              lastX = currentX;
              scrollable?.scrollBy({ left: diffX });
            },
          },
          ...(
            [
              "pointercancel",
              "pointerup",
              "pointerdown",
              "keydown",
              "resize",
              "click",
              "visibilitychange",
            ] as const
          ).map((eventName) => ({
            type: eventName,
            listener: () => {
              cleanupEvents();
            },
          })),
        ],
        { capture: true },
      );

      cleanupActive = cleanupEvents;
    }

    const cleanupStart = bindAll(scrollable, [
      {
        type: "pointerdown",
        listener(event) {
          if (!(event.target instanceof HTMLElement)) {
            return;
          }
          // ignore interactive elements
          if (event.target.closest(`[${blockBoardPanningAttr}]`)) {
            return;
          }

          begin({ startX: event.clientX });
        },
      },
    ]);

    return function cleanupAll() {
      cleanupStart();
      cleanupActive?.();
    };
  }, []);

  return (
    <main className={styles.board} ref={scrollableRef}>
      {columns.map((column) => (
        <ColumnComponent
          key={column.id}
          tasks={column.tasks}
          id={column.id}
          title={column.title}
        />
      ))}
      <CreateColumn />
    </main>
  );
};

export default Board;
