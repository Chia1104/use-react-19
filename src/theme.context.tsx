import { useLocalStorage } from "usehooks-ts";
import { createContext, FC, ReactNode, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["theme", () => {}]);

export const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "system");
  return <ThemeContext value={[theme, setTheme]}>{children}</ThemeContext>;
};
