import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type ThemeMode = "light" | "dark";

type DarkModeContextValue = {
	mode: ThemeMode;
	isDark: boolean;
	setMode: (mode: ThemeMode) => void;
	toggle: () => void;
};

const DarkModeContext = createContext<DarkModeContextValue | undefined>(
	undefined,
);

const STORAGE_KEY = "majlis-theme";

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return "light";
	}

	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === "light" || saved === "dark") {
		return saved;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

type DarkModeProviderProps = {
	children: ReactNode;
};

function DarkModeProvider({ children }: DarkModeProviderProps) {
	const [mode, setMode] = useState<ThemeMode>(getInitialMode);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", mode === "dark");
		root.style.colorScheme = mode;
		window.localStorage.setItem(STORAGE_KEY, mode);
	}, [mode]);

	const value = useMemo<DarkModeContextValue>(
		() => ({
			mode,
			isDark: mode === "dark",
			setMode,
			toggle: () =>
				setMode((current) => (current === "dark" ? "light" : "dark")),
		}),
		[mode],
	);

	return (
		<DarkModeContext.Provider value={value}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (!context) {
		throw new Error("useDarkMode must be used within DarkModeProvider");
	}
	return context;
}

export { DarkModeProvider, useDarkMode };
