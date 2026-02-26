import React, {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
} from "react";
import { LightTheme, DarkTheme } from "../theme";

export type Theme = typeof LightTheme;

export type ThemeContextType = {
    theme: Theme;
    scheme: "light" | "dark";
    setScheme: (scheme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: LightTheme,
    scheme: "light",
    setScheme: () => { },
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [scheme, setScheme] = useState<"light" | "dark">("dark");
    const theme = scheme === "light" ? LightTheme : DarkTheme;

    return (
        <ThemeContext.Provider value={{ theme, scheme, setScheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
