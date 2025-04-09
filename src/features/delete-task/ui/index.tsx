import { memo, use } from "react";
import { Trash } from "lucide-react";

import { BoardDispatchContext } from "@entities/board";
import Button from "@ui/Button";

interface DeleteTaskProps {
  columnId: string;
  taskId: string;
}

const DeleteTask = ({ columnId, taskId }: DeleteTaskProps) => {
  const dispatch = use(BoardDispatchContext);

  return (
    <Button
      onClick={() => {
        dispatch({ type: "DELETE_TASK", payload: { taskId, columnId } });
      }}
    >
      <Trash size={20} />
    </Button>
  );
};

export default memo(DeleteTask);
