import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import monitorForColumns from "../lib/monitor-for-columns";
import monitorForTasks from "../lib/monitor-for-tasks";

import styles from "./styles.module.css";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { unsafeOverflowAutoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element";
import { boardApi } from "@entities/board";
import { Column, isDraggingAColumn } from "@entities/column";
import { isDraggingATask } from "@entities/task";

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
