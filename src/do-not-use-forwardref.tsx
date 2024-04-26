import {
  useImperativeHandle,
  type ChangeEvent,
  useState,
  ComponentPropsWithRef,
  useId,
} from "react";
import { z } from "zod";

interface Props<TSchema = unknown> extends ComponentPropsWithRef<"input"> {
  schema?: z.ZodType<TSchema>;
}

export interface Ref extends Partial<HTMLInputElement> {
  validate: () => boolean;
}

const DoNotUseForwardRef = <TSchema extends unknown>({
  ref,
  schema,
  ...props
}: Props<TSchema>) => {
  useImperativeHandle<Partial<HTMLInputElement>, Ref>(ref, () => ({
    validate: () => isValid,
    ...ref,
  }));

  const id = useId();
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
        ref={ref}
        type="text"
        onChange={handleInput}
      />
    </>
  );
};

export default DoNotUseForwardRef;
