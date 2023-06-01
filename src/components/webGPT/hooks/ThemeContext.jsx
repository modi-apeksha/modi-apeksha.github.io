import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Theme from "../config/default.theme.config";


const ThemeContext = createContext(null);
export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error(
            `useTheme() can only be used inside of <ThemeProvider />, please declare it at a higher level.`,
        );
    }
    const { theme, setTheme } = themeContext;
    return useMemo(() => {
        return {
            ...theme,
            setTheme
        }
    }, [
        theme,
        setTheme
    ])
}

export const ThemeProvider = ({ theme=Theme, children }) => {
    const [_theme, setTheme] = useState({
        BASE_COLOR: "",
        TEXT_COLOR: "",
        ACCENT_COLOR: "",
        PRIMARY_COLOR: "",
        SECONDARY_COLOR: "",
        PRIMARY_TEXT_COLOR: "",
        HIGHLIGHT_BG_COLOR: "",
        HIGHLIGHT_TEXT_COLOR: "",
    });

    useEffect(() => {
        setTheme(theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        Object.keys(theme).map((el, i) => {
            let name = el.toLowerCase().split("_").map(substr => substr.charAt(0)
                .toUpperCase() +
                substr.slice(1))
                .join("");
            name = name.charAt(0).toLowerCase() + name.slice(1);
            root.style.setProperty(`--${name}`, theme[el]);
        })
    }, [_theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme: _theme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}