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
import { APP_NAME } from "./constants";
import { ActionType } from "../../actions/constants/actionTypes";
import { logoutUser } from "../../actions/userActions";

export default function AppNavbar(props: PropsType) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Navbar color="dark" dark expand="md" fixed="top">
			<NavbarBrand href="/">
				<img src="logo.svg" className="logo" />
				{APP_NAME}
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
							onClick={() => logoutUser(props.dispatch)}
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
	dispatch: React.Dispatch<ActionType>;
	isLoggedIn: boolean;
};
