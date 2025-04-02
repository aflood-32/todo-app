import { memo, useRef, useState } from "react";
import { Plus } from "lucide-react";

import useCreateTask from "../lib/useCreateTask.tsx";

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

const UpdateTask = memo(({ columnId }: CreateTaskProps) => {
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

export { CreateTask, UpdateTask };
