import { FormEvent, RefObject, useState } from "react";
import { X } from "lucide-react";

import styles from "./styles.module.css";

import Button from "@ui/Button";
import PrimaryButton from "@ui/PrimaryButton";
import Textarea from "@ui/Textarea";

interface CreateColumnFormProps {
  ref: RefObject<HTMLFormElement | null>;
  onSubmitSuccess: (title: string) => void;
  onDismiss: () => void;
}

const textAreaLabel = "Enter column name";

const CreateColumnForm = ({
  ref,
  onSubmitSuccess,
  onDismiss,
}: CreateColumnFormProps) => {
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
      <div className={styles.create_col__form_footer}>
        <PrimaryButton type="submit">Add column</PrimaryButton>
        <Button onClick={onDismiss}>
          <X size={20} color="var(--color-text)" />
        </Button>
      </div>
    </form>
  );
};

export default CreateColumnForm;
