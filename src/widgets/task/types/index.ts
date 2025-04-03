import { RefObject } from "react";

import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { TaskType } from "@entities/task";

export interface TaskProps extends TaskType {
  columnId: string;
}

export type TaskState =
  | {
      type: "idle";
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-and-left-self";
    }
  | {
      type: "is-over";
      dragging: DOMRect;
      closestEdge: Edge;
    }
  | {
      type: "preview";
      container: HTMLElement;
      dragging: DOMRect;
    };

export interface TaskDisplayProps extends TaskProps {
  state: TaskState;
  outerRef?: RefObject<HTMLLIElement | null>;
  innerRef?: RefObject<HTMLDivElement | null>;
}
