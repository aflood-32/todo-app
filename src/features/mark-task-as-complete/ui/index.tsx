import { memo, use } from "react";

import { BoardDispatchContext } from "@entities/board";
import { WithIds } from "@shared/types/with-ids";
import Checkbox from "@ui/Checkbox";

type MarkTaskAsCompleteProps = Required<WithIds> & { completed: boolean };

const MarkTaskAsComplete = ({
  taskId,
  columnId,
  completed,
}: MarkTaskAsCompleteProps) => {
  const dispatch = use(BoardDispatchContext);

  return (
    <Checkbox
      checked={completed}
      onChange={(value) => {
        dispatch({
          type: "UPDATE_TASK",
          payload: { columnId, taskId, updatedTask: { completed: value } },
        });
      }}
    />
  );
};

export default memo(MarkTaskAsComplete);
