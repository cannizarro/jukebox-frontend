import { useContext } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserContext } from "./providers/UserContextProvider";
import AppNavbar from "./components/common/AppNavbar";

export default function App() {
	const userContext = useContext(UserContext);

	const currentYear = new Date().getFullYear();
	const copyrightString =
		currentYear === 2023 ? "2023" : "2023-" + currentYear;

	return (
		<>
			<AppNavbar
				dispatch={userContext.dispatch}
				isLoggedIn={Boolean(userContext.user.username)}
			/>

			{userContext.user.username ? <Home /> : <Login />}

			<footer className="py-4 bg-dark d-flex flex-column text-light justify-content-center align-items-center">
				<img src="logo.svg" className="logo" />
				<small>© {copyrightString}</small>
				<small className="fw-light m-2">For more fine grained control or in case of inconsistencies please visit <a href="https://open.spotify.com" target="_blank">Spotify</a> from the navbar at the top.</small>
			</footer>
		</>
	);
}
