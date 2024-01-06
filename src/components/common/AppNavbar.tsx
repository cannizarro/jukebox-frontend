import { useState } from "react";
import {
	Button,
	Collapse,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
} from "reactstrap";
import { logoutUser } from "../../actions/userActions";
import { UserContextType } from "../../providers/UserContextProvider";
import { APP_NAME } from "../../constants/constants";

export default function AppNavbar(props: PropsType) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Navbar color="dark" dark expand="md" fixed="top">
			<NavbarBrand
				href={props.isLoggedIn ? "/" : ""}
				className="d-flex align-items-center"
			>
				<img src="logo.svg" className="logo" />
				<span className="d-flex flex-column ms-2">
					{APP_NAME}
					{props.userContext.user.restaurantName && (
						<small className="text-secondary">
							<small className="fw-small">for </small>
							{props.userContext.user.restaurantName}
						</small>
					)}
				</span>
			</NavbarBrand>
			{props.isLoggedIn && (
				<>
					<NavbarToggler
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					/>
					<Collapse isOpen={isOpen} navbar>
						<Nav style={{ width: "100%" }} navbar>
							<NavItem className="mx-2">
								<NavLink
									href="https://open.spotify.com"
									target="_blank"
								>
									Spotify
								</NavLink>
							</NavItem>
							<NavItem className="mx-2">
								<NavLink
									href="https://open.spotify.com"
									target="_blank"
								>
									Transactions
								</NavLink>
							</NavItem>
						</Nav>
						<Button
							onClick={() =>
								logoutUser(props.userContext.dispatch)
							}
							className="mr-auto"
						>
							Logout
						</Button>
					</Collapse>
				</>
			)}
		</Navbar>
	);
}

type PropsType = {
	userContext: UserContextType;
	isLoggedIn: boolean;
};
