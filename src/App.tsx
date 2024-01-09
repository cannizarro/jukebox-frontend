import { useContext } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserContext } from "./providers/UserContextProvider";
import AppNavbar from "./components/common/AppNavbar";
import CustomerHome from "./components/CustomerHome";
import {
	ACTIVITY_PADDING_TOP_WITHOUT_RESTAURANT,
	ACTIVITY_PADDING_TOP_WITH_RESTAURANT,
} from "./constants/constants";

export default function App() {
	const userContext = useContext(UserContext);
	const currentYear = new Date().getFullYear();
	const copyrightString =
		currentYear === 2023 ? "2023" : "2023-" + currentYear;
	const isLoggedIn = Boolean(userContext.user.username);
	const paddingTop = userContext.user.restaurantName
		? ACTIVITY_PADDING_TOP_WITH_RESTAURANT
		: ACTIVITY_PADDING_TOP_WITHOUT_RESTAURANT;

	return (
		<div style={{ paddingTop: paddingTop }}>
			<AppNavbar {...{ userContext, isLoggedIn }} />
			{window.location.pathname.startsWith("/spotify-") ? (
				<CustomerHome
					{...{
						username: window.location.pathname.substring(1),
						userDispatch: userContext.dispatch
					}}
				/>
			) : isLoggedIn ? (
				<Home/>
			) : (
				<Login/>
			)}

			<footer className="py-4 bg-dark d-flex flex-column text-light justify-content-center align-items-center">
				<img src="logo.svg" className="logo" />
				<small>© {copyrightString}</small>
				<small className="fw-light m-2">
					For more fine grained control or in case of inconsistencies
					please visit{" "}
					<a href="https://open.spotify.com" target="_blank">
						Spotify
					</a>{" "}
					from the navbar at the top.
				</small>
			</footer>
		</div>
	);
}
