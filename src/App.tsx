import { Suspense, use, useRef } from "react";
import UsePokemon from "./use-pokemon";
import DoNotUseForwardRef, { type Ref } from "./do-not-use-forwardref";
import "./App.css";
import { cn } from "@/utils";
import { ErrorBoundary } from "./error-boundary";
import { z } from "zod";
import { Theme, ThemeContext } from "./theme.context";

const Loading = () => <>⌛ LOADING!!! ⌛</>;

const Meta = () => {
  return <title>Hello React 19</title>;
};

function App() {
  const [theme, setTheme] = use(ThemeContext);
  const inputRef = useRef<Ref>(null);
  return (
    <div className={cn("App flex flex-col items-center justify-center gap-5")}>
      <Meta />
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <DoNotUseForwardRef<string>
        schema={z.string().length(3)}
        // ref={inputRef}
        ref={(node) => {
          console.log(node?.validate());
        }}
      />
      <button onClick={() => console.log(inputRef.current?.validate())}>
        check input validity
      </button>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <UsePokemon />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Index() {
  return (
    <Theme>
      <App />
    </Theme>
  );
}

export default Index;
