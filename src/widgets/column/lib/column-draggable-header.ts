import invariant from "tiny-invariant";

import { ColumnState } from "../types";

import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { isColumnData } from "@entities/column";
import { IDLE_STATE } from "@shared/lib/idle-state";

/**
 * Configuration for draggable column headers
 *
 * @interface DraggableArgs
 * @property {HTMLElement} header - The draggable header element
 * @property {HTMLElement} inner - Element to clone for drag preview
 * @property {Record<string, unknown>} data - Data to attach to drag operation
 * @property {React.Dispatch<React.SetStateAction<ColumnState>>} setColumnState - Column state manager
 */
interface DraggableArgs {
  header: HTMLElement;
  inner: HTMLElement;
  data: Record<string, unknown>;
  setColumnState: React.Dispatch<React.SetStateAction<ColumnState>>;
}

/**
 * Makes a column header draggable with custom drag preview
 *
 * @param {Object} config - Configuration for draggable column header
 * @param {HTMLElement} config.header - The header element to make draggable
 * @param {HTMLElement} config.inner - Inner element used for drag preview
 * @param {Record<string, unknown>} config.data - Drag data payload
 * @param {React.Dispatch<React.SetStateAction<ColumnState>>} config.setColumnState - State setter for column visual feedback
 *
 * @returns {Function} Cleanup function to remove draggable behavior
 *
 * @behavior
 * - Creates a custom drag preview matching the column's dimensions
 * - Preserves the original offset during dragging
 * - Manages column state during drag operations:
 *   - Sets 'is-dragging' state on drag start
 *   - Resets to idle state on drop
 *
 * @interactions
 * - onGenerateDragPreview: Creates pixel-perfect preview clone
 * - onDragStart: Initiates drag visual state
 * - onDrop: Cleans up after drop completion
 *
 */

const columnDraggableHeader = ({
  header,
  inner,
  data,
  setColumnState,
}: DraggableArgs) => {
  return draggable({
    element: header,
    getInitialData: () => data,
    onGenerateDragPreview({ source, location, nativeSetDragImage }) {
      const data = source.data;

      invariant(isColumnData(data));

      setCustomNativeDragPreview({
        nativeSetDragImage,
        getOffset: preserveOffsetOnSource({
          element: header,
          input: location.current.input,
        }),
        render({ container }) {
          const rect = inner.getBoundingClientRect();
          const preview = inner.cloneNode(true);

          invariant(preview instanceof HTMLElement);

          preview.style.width = `${rect.width.toString()}px`;
          preview.style.height = `${rect.height.toString()}px`;

          container.appendChild(preview);
        },
      });
    },
    onDragStart() {
      setColumnState({ type: "is-dragging" });
    },
    onDrop() {
      setColumnState(IDLE_STATE);
    },
  });
};

export default columnDraggableHeader;
