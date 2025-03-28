import styles from "./styles.module.css";

interface BackdropProps {
  height: number;
}

const Backdrop = ({ height }: BackdropProps) => {
  return <div className={styles.backdrop} style={{ height }} />;
};

export default Backdrop;
