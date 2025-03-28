import { useEffect, useRef, useState } from "react";
import { bindAll } from "bind-event-listener";
import invariant from "tiny-invariant";

import monitorForColumns from "../lib/monitor-for-columns";
import monitorForTasks from "../lib/monitor-for-tasks";

import styles from "./styles.module.css";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { boardApi } from "@entities/board";
import { Column, isDraggingAColumn } from "@entities/column";
import { isDraggingATask } from "@entities/task";
import { blockBoardPanningAttr } from "@shared/lib/block-board-panning-attr.ts";

interface BoardProps {
  ColumnComponent: React.FC<Column>;
}

const SCROLL_OFFSET = 1000;

const Board = ({ ColumnComponent }: BoardProps) => {
  const [columns, setColumnsData] = useState(boardApi.get());

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
  }, [columns]);

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
          // stop panning if we see any of these events
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
        // need to make sure we are not after the "pointerdown" on the scrollable
        // Also this is helpful to make sure we always hear about events from this point
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
    </main>
  );
};

export default Board;
