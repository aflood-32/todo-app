import invariant from "tiny-invariant";

import { IDLE_STATE } from "../lib/idle-state";
import { TaskState } from "../types";

import { getTaskInitialData, isTaskData } from "./dnd-data-utils";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";

interface DraggableArgs {
  element: HTMLElement;
  taskId: string;
  title: string;
  columnId: string;
  setTaskState: React.Dispatch<React.SetStateAction<TaskState>>;
}

const taskDraggable = ({
  element,
  taskId,
  title,
  columnId,
  setTaskState,
}: DraggableArgs) => {
  return draggable({
    element,
    getInitialData: ({ element }) =>
      getTaskInitialData({
        task: { id: taskId, title },
        columnId,
        rect: element.getBoundingClientRect(),
      }),
    onGenerateDragPreview({ nativeSetDragImage, location, source }) {
      const data = source.data;

      invariant(isTaskData(data));

      setCustomNativeDragPreview({
        nativeSetDragImage,
        getOffset: preserveOffsetOnSource({
          element,
          input: location.current.input,
        }),
        render({ container }) {
          setTaskState({
            type: "preview",
            container,
            dragging: element.getBoundingClientRect(),
          });
        },
      });
    },
    onDragStart() {
      setTaskState({ type: "is-dragging" });
    },
    onDrop() {
      setTaskState(IDLE_STATE);
    },
  });
};

export default taskDraggable;
