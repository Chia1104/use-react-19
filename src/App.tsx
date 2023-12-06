import { Suspense, useRef } from "react";
import UsePokemon from "./use-pokemon";
import DoNotUseForwardRef from "./do-not-use-forwardref";
import "./App.css";
import { cn } from "@/utils";
import { ErrorBoundary } from "./error-boundary";

const Loading = () => <>⌛ LOADING!!! ⌛</>;

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={cn("App flex flex-col items-center justify-center gap-5")}>
      <DoNotUseForwardRef inputRef={inputRef} />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <UsePokemon />
        </Suspense>
      </ErrorBoundary>
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </div>
  );
}

export default App;
