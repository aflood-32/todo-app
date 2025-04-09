import { Check } from "lucide-react";

import styles from "./styles.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={styles.checkbox_container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <span className={styles.checkbox}>
        <Check />
      </span>
    </label>
  );
};

export default Checkbox;
