import React, { memo, useState } from "react";

import styles from "./styled.module.css";

import { ChangeColumnTitle } from "@features/change-column-title";

interface ColumnHeaderProps {
  ref: React.RefObject<HTMLDivElement | null>;
  columnId: string;
  title: string;
}

const ColumnHeader = ({ ref, columnId, title }: ColumnHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={ref}
      className={styles.column__header}
      onClick={() => {
        setIsEditing(true);
      }}
    >
      {!isEditing && <h2 className={styles.column__header_title}>{title}</h2>}
      {isEditing && (
        <ChangeColumnTitle
          columnId={columnId}
          initialValue={title}
          onChangeComplete={() => {
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default memo(ColumnHeader);
