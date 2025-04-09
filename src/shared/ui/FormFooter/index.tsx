import { PropsWithChildren } from "react";
import { X } from "lucide-react";

import styles from "./styles.module.css";

import Button from "@ui/Button";
import PrimaryButton from "@ui/PrimaryButton";

interface FormFooterProps extends PropsWithChildren {
  submitButtonLabel: string;
  onDismiss?: () => void;
}

const FormFooter = ({
  submitButtonLabel,
  onDismiss,
  children,
}: FormFooterProps) => {
  return (
    <div className={styles.form_footer}>
      <PrimaryButton type="submit">{submitButtonLabel}</PrimaryButton>
      {onDismiss && (
        <Button onClick={onDismiss}>
          <X size={20} color="var(--color-text)" />
        </Button>
      )}
      {children}
    </div>
  );
};

export default FormFooter;
