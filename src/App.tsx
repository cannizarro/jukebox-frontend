import { useContext } from "react";
import { UserContext } from "./providers/UserContextProvider";
import AppNavbar from "./components/common/AppNavbar";
import {
	ACTIVITY_PADDING_TOP_WITHOUT_RESTAURANT,
	ACTIVITY_PADDING_TOP_WITH_RESTAURANT,
} from "./constants/constants";
import { Outlet } from "react-router-dom";
import { getImageUrl } from "./utils/genericUtils";

export default function App() {
	const userContext = useContext(UserContext);
	const currentYear = new Date().getFullYear();
	const copyrightString =
		currentYear === 2023 ? "2023" : "2023-" + currentYear;
	const paddingTop = userContext.user.restaurantName
		? ACTIVITY_PADDING_TOP_WITH_RESTAURANT
		: ACTIVITY_PADDING_TOP_WITHOUT_RESTAURANT;

	return (
		<div style={{ paddingTop: paddingTop }}>
			<AppNavbar />
			<Outlet/>
			<footer className="py-4 bg-dark d-flex flex-column text-light justify-content-center align-items-center">
				<img src={getImageUrl("logo.svg")} className="logo" />
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
