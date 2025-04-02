import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import invariant from "tiny-invariant";

import styles from "./styles.module.css";

const Textarea = (
  props: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      invariant(textareaRef.current);

      textareaRef.current.style.height = "3.2rem";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight.toString() + "px";
    };

    const textarea = textareaRef.current;

    invariant(textarea);

    textarea.addEventListener("input", adjustHeight);
    adjustHeight();

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className={styles.textarea}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
  );
};

export default Textarea;
