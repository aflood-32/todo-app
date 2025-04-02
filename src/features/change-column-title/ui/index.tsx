import { useState } from "react";

import useUpdateColumn from "../lib/useUpdateColumn";

import Textarea from "@ui/Textarea";

interface EditColumnProps {
  columnId: string;
  initialValue: string;
  onChangeComplete: () => void;
}

const ChangeColumnTitle = ({
  columnId,
  initialValue,
  onChangeComplete,
}: EditColumnProps) => {
  const [title, setTitle] = useState(initialValue);

  const { updateColumnTitle } = useUpdateColumn();

  return (
    <Textarea
      style={{ width: "100%" }}
      placeholder={title}
      aria-label={title}
      value={title}
      autoFocus
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onBlur={() => {
        if (initialValue !== title) {
          updateColumnTitle(columnId, title);
        }

        onChangeComplete();
      }}
      maxLength={255}
    />
  );
};

export default ChangeColumnTitle;
