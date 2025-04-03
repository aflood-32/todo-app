import { memo, useRef, useState } from "react";
import { Edit, Plus } from "lucide-react";

import useCreateTask from "../lib/useCreateTask.tsx";

import styles from "./styles.module.css";
import UpsertTaskForm from "./UpsertTaskForm";

import useClickOutside from "@shared/lib/useClickOutside";
import Button from "@ui/Button";
import FormFooter from "@ui/FormFooter";

interface CreateTaskProps {
  columnId: string;
}

const CreateTask = memo(({ columnId }: CreateTaskProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isCreateActive, setIsCreateActive] = useState(false);

  useClickOutside(formRef, () => {
    setIsCreateActive(false);
  });

  const { createTask } = useCreateTask();

  return (
    <>
      {!isCreateActive && (
        <Button
          style={{ width: "100%" }}
          onClick={() => {
            setIsCreateActive(true);
          }}
        >
          <Plus size={20} color="var(--color-text)" /> Add task
        </Button>
      )}
      {isCreateActive && (
        <UpsertTaskForm
          ref={formRef}
          onSubmitSuccess={(title) => {
            createTask({
              columnId,
              newTask: { title },
              onCreateComplete: () => {
                setIsCreateActive(false);
              },
            });
          }}
        >
          <FormFooter
            onDismiss={() => {
              setIsCreateActive(false);
            }}
            submitButtonLabel="Add task"
          />
        </UpsertTaskForm>
      )}
    </>
  );
});

interface UpdateTaskProps extends CreateTaskProps {
  columnId: string;
  taskId: string;
}

const UpdateTask = memo(({ columnId, taskId }: UpdateTaskProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isUpdateActive, setIsUpdateActive] = useState(false);

  useClickOutside(formRef, () => {
    setIsUpdateActive(false);
  });

  const { updateTask } = useCreateTask();

  return (
    <>
      {!isUpdateActive && (
        <button type="button" className={styles.update_task__button}>
          <Edit size={10} />
        </button>
      )}
      {isUpdateActive && (
        <UpsertTaskForm
          ref={formRef}
          onSubmitSuccess={(title) => {
            updateTask({
              columnId,
              taskId,
              updatedTask: { title },
              onUpdateComplete: () => {
                setIsUpdateActive(false);
              },
            });
          }}
        >
          <FormFooter
            onDismiss={() => {
              setIsUpdateActive(false);
            }}
            submitButtonLabel="Add task"
          />
        </UpsertTaskForm>
      )}
    </>
  );
});

export { CreateTask, UpdateTask };
