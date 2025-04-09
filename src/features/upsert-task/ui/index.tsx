import { memo, PropsWithChildren, RefObject, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Edit, Plus } from "lucide-react";
import invariant from "tiny-invariant";

import useCreateTask from "../lib/useCreateTask";

import styles from "./styles.module.css";
import UpsertTaskForm from "./UpsertTaskForm";

import useClickOutside from "@shared/lib/useClickOutside";
import { WithIds } from "@shared/types/with-ids";
import Button from "@ui/Button";
import FormFooter from "@ui/FormFooter";

type CreateTaskProps = Pick<Required<WithIds>, "columnId">;

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

interface UpdateTaskProps extends Required<WithIds>, PropsWithChildren {
  outerRef?: RefObject<HTMLLIElement | null>;
  initialValue: string;
}

const UpdateTask = memo(
  ({ columnId, taskId, initialValue, outerRef, children }: UpdateTaskProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [isUpdateActive, setIsUpdateActive] = useState(false);

    useClickOutside(formRef, () => {
      setIsUpdateActive(false);
    });

    const { updateTask } = useCreateTask();

    const getPopOverStyles = () => {
      invariant(outerRef?.current);
      const { left, top, width } = outerRef.current.getBoundingClientRect();

      return { left, top, width };
    };

    return (
      <>
        {!isUpdateActive && (
          <Button
            type="button"
            onClick={() => {
              setIsUpdateActive(true);
            }}
          >
            <Edit size={12} />
          </Button>
        )}
        {isUpdateActive &&
          createPortal(
            <div className={styles.update_task__container}>
              <div
                className={styles.update_task__block}
                style={getPopOverStyles()}
              >
                <UpsertTaskForm
                  ref={formRef}
                  initialValue={initialValue}
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
                  <FormFooter submitButtonLabel="Save">{children}</FormFooter>
                </UpsertTaskForm>
              </div>
            </div>,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            document.querySelector("#modalRoot")!,
          )}
      </>
    );
  },
);

export { CreateTask, UpdateTask };
