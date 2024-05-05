import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { FC, ReactNode } from "react";
import { useCookies } from "react-cookie";

export interface AuthContext {
	status: "auth" | "guest" | "loading";
	user: AuthData | null;
	onSignUp: (data: AuthData, cb: (data: AuthData) => void) => void;
	onLogout: (cb: () => void) => void;
}

export interface AuthData {
	id: number;
	name: string;
	email: string;
	key: string;
	secret: string;
}

const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [cookies, setCookies, removeCookies] = useCookies();
	const [status, setStatus] = useState<AuthContext["status"]>("loading");
	const [user, setUser] = useState<AuthData | null>(null);

	function onSignUp(data: AuthData, callback: (data: AuthData) => void) {
		setCookies("td-auth-token", data, {
			path: "/",
		});
		setStatus("auth");
		setUser(data);
		callback(data);
	}

	function onLogout(cb: () => void) {
		removeCookies("td-auth-token", { path: "/" });
		setStatus("guest");
		setUser(null);
		cb();
	}

	const onRefresh = useCallback(() => {
		const authData = cookies["td-auth-token"];
		if (!authData) {
			setStatus("guest");
			setUser(null);
			return;
		}
		setStatus("auth");
		setUser(authData);
	}, [cookies]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		onRefresh();
	}, []);

	const contextValue: AuthContext = {
		onSignUp,
		onLogout,
		status,
		user,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
