import {
  useImperativeHandle,
  type ChangeEvent,
  useState,
  ComponentPropsWithoutRef,
  useId,
  useRef,
} from "react";
import { z } from "zod";

interface Props<TSchema = unknown> extends ComponentPropsWithoutRef<"input"> {
  schema?: z.ZodType<TSchema>;
  ref?: React.Ref<Ref>;
}

export interface Ref extends Partial<HTMLInputElement> {
  validate: () => boolean;
}

const DoNotUseForwardRef = <TSchema,>({
  ref,
  schema,
  ...props
}: Props<TSchema>) => {
  useImperativeHandle<Partial<HTMLInputElement>, Ref>(ref, () => ({
    validate: () => isValid,
    ...inputRef.current,
  }));

  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (schema) {
      setIsValid(schema.safeParse(event.target.value).success);
    }
    props.onChange?.(event);
  };

  return (
    <>
      <label htmlFor={id}>Do Not Use Forward Ref</label>
      <input
        className="rounded-md p-1"
        id={id}
        ref={inputRef}
        type="text"
        onChange={handleInput}
      />
    </>
  );
};

export default DoNotUseForwardRef;
