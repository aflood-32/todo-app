import { memo, useRef, useState } from "react";
import { Plus } from "lucide-react";

import useCreateColumn from "../lib/useCreateColumn";

import CreateColumnForm from "./CreateColumnForm";
import styles from "./styles.module.css";

import useClickOutside from "@shared/lib/useClickOutside";

const CreateColumn = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isCreateActive, setIsCreateActive] = useState(false);

  useClickOutside(formRef, () => {
    setIsCreateActive(false);
  });

  const { createColumn } = useCreateColumn();

  return (
    <div className={styles.create_col}>
      {!isCreateActive && (
        <button
          type="button"
          className={styles.create_col__button}
          onClick={() => {
            setIsCreateActive(true);
          }}
        >
          <Plus size={16} />
          Add new column
        </button>
      )}
      {isCreateActive && (
        <CreateColumnForm
          ref={formRef}
          onDismiss={() => {
            setIsCreateActive(false);
          }}
          onSubmitSuccess={(title) => {
            createColumn(title, () => {
              setIsCreateActive(false);
            });
          }}
        />
      )}
    </div>
  );
};

export default memo(CreateColumn);
