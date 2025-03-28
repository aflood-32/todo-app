export type ColumnState =
  | {
      type: "is-task-over";
      isOverChildTask: boolean;
      dragging: DOMRect;
    }
  | {
      type: "is-column-over";
    }
  | {
      type: "idle";
    }
  | {
      type: "is-dragging";
    };
