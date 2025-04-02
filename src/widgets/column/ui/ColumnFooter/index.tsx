import { memo } from "react";
import { Plus } from "lucide-react";

import styles from "./styled.module.css";

import Button from "@ui/Button";

// type ColumnHeaderProps = PropsWithChildren & {};

const ColumnFooter = () => {
  return (
    <div className={styles.column__footer}>
      <Button style={{ width: "100%" }}>
        <Plus size={20} color="var(--color-text)" /> Add task
      </Button>
    </div>
  );
};

export default memo(ColumnFooter);
