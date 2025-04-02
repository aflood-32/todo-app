import { FormEvent, PropsWithChildren, RefObject, useState } from "react";

import styles from "./styles.module.css";

import Textarea from "@ui/Textarea";

interface CreateTaskFormProps extends PropsWithChildren {
  ref: RefObject<HTMLFormElement | null>;
  onSubmitSuccess: (title: string) => void;
}

const textAreaLabel = "Enter task name";

const CreateTaskForm = ({
  ref,
  onSubmitSuccess,
  children,
}: CreateTaskFormProps) => {
  const [formData, setFormData] = useState<{ title: string }>({ title: "" });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim().length) {
      return;
    }

    onSubmitSuccess(formData.title);
  };

  return (
    <form ref={ref} onSubmit={onSubmit} className={styles.create_col__form}>
      <Textarea
        placeholder={textAreaLabel}
        aria-label={textAreaLabel}
        value={formData.title}
        autoFocus
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
        maxLength={255}
      />
      {children}
    </form>
  );
};

export default CreateTaskForm;
