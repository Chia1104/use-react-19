import {
  type RefObject,
  useImperativeHandle,
  type ChangeEvent,
  useState,
  ComponentPropsWithoutRef,
} from "react";
import { z } from "zod";

interface Props extends ComponentPropsWithoutRef<"input"> {
  schema?: z.ZodType<any, any>;
  inputRef?: RefObject<HTMLInputElement>;
}

interface Ref {
  validate: () => boolean;
}

const DoNotUseForwardRef = ({ inputRef, schema, ...props }: Props) => {
  /**
   * WHY `forwardRef` WILL BE DEPRECATED?
   */
  useImperativeHandle<HTMLInputElement, any>(inputRef, () => ({
    // what should we do here?
  }));

  const [isValid, setIsValid] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (schema) {
      setIsValid(schema.safeParse(event.target.value).success);
    }
    props.onChange?.(event);
  };

  return (
    <input
      className="rounded-md p-1"
      ref={inputRef}
      type="text"
      onChange={handleInput}
    />
  );
};

export default DoNotUseForwardRef;
