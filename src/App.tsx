import { Suspense, useRef } from "react";
import UsePokemon from "./use-pokemon";
import DoNotUseForwardRef, { Ref } from "./do-not-use-forwardref";
import "./App.css";
import { cn } from "@/utils";
import { ErrorBoundary } from "./error-boundary";
import { z } from "zod";

const Loading = () => <>⌛ LOADING!!! ⌛</>;

function App() {
  const inputRef = useRef<Ref>(null);
  return (
    <div className={cn("App flex flex-col items-center justify-center gap-5")}>
      <DoNotUseForwardRef<string>
        schema={z.string().length(3)}
        ref={inputRef}
      />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <UsePokemon />
        </Suspense>
      </ErrorBoundary>
      <button onClick={() => console.log(inputRef.current?.validate())}>
        Validate
      </button>
    </div>
  );
}

export default App;
