import { Suspense, useRef, use } from "react";
import UsePokemon from "./use-pokemon";
import DoNotUseForwardRef, { Ref } from "./do-not-use-forwardref";
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
  const inputRef = useRef<Ref>(null);
  const [theme, setTheme] = use(ThemeContext);
  return (
    <div className={cn("App flex flex-col items-center justify-center gap-5")}>
      <Meta />
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <DoNotUseForwardRef<string>
        schema={z.string().length(3)}
        ref={(ref) => {
          console.log(ref);
        }}
      />
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
