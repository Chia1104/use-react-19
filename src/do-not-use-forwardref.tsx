import {
  useImperativeHandle,
  type ChangeEvent,
  useState,
  ComponentPropsWithRef,
  useRef,
  FC,
} from "react";
import { z } from "zod";

interface Props<TSchema = unknown> extends ComponentPropsWithRef<"input"> {
  schema?: z.ZodType<TSchema>;
}

export interface Ref extends HTMLInputElement {
  validate: () => boolean;
}

const DoNotUseForwardRef = <TSchema = unknown,>({
  ref,
  schema,
  ...props
}: Props<TSchema>) => {
  useImperativeHandle<HTMLInputElement, Ref>(ref, () => ({
    validate: () => isValid,
    ...inputRef.current!,
  }));

  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
