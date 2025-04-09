import { FormEvent, PropsWithChildren, RefObject, useState } from "react";

import styles from "./styles.module.css";

import Textarea from "@ui/Textarea";

interface UpsertTaskFormProps extends PropsWithChildren {
  ref: RefObject<HTMLFormElement | null>;
  onSubmitSuccess: (title: string) => void;
  initialValue?: string;
  submitLabel?: string;
  withBg?: boolean;
}

const textAreaLabel = "Enter task name";

const UpsertTaskForm = ({
  ref,
  onSubmitSuccess,
  initialValue,
  children,
}: UpsertTaskFormProps) => {
  const [formData, setFormData] = useState<{ title: string }>({
    title: initialValue ?? "",
  });

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
        style={{ minHeight: "6rem" }}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
        maxLength={255}
      />
      {children}
    </form>
  );
};

export default UpsertTaskForm;
