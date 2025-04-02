import styles from "./styles.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
      <div className={styles.loading__column_skeleton} />
    </div>
  );
};

export default Loading;
