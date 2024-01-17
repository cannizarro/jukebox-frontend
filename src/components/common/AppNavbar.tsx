import { useContext, useState } from "react";
import {
	Button,
	Collapse,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler
} from "reactstrap";
import { logoutUser } from "../../actions/userActions";
import { UserContext } from "../../providers/UserContextProvider";
import { APP_NAME } from "../../constants/constants";
import CustomLink, { PropType as LinkPropType } from "./CustomLink";
import QRCodeComponent from "../dashboard/QRCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

export default function AppNavbar() {
	const userContext = useContext(UserContext);
	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

	const navs: Array<LinkPropType> = [
		{
			children: <>Dashboard</>,
			to: "/",
			target: "_self"
		},
		{
			children: <>Transactions</>,
			to: "/transactions",
			target: "_self"
		},
		{
			children: <>Jukebox</>,
			to: "/" + userContext.user.username,
			target: "_blank"
		},
		{
			children: <>Spotify ↗</>,
			to: "https://open.spotify.com",
			target: "_blank"
		}
	]

	return (
		<Navbar color="dark" dark expand="md" fixed="top">
			<NavbarBrand
				className="d-flex align-items-center"
				onClick={toggle}
			>
				<img src="logo.svg" className="logo" />
				<span className="d-flex flex-column ms-2">
					{APP_NAME}
					{userContext.user.restaurantName && (
						<small className="text-secondary">
							<small className="fw-small">for </small>
							{userContext.user.restaurantName}
						</small>
					)}
				</span>
			</NavbarBrand>
			{userContext.user.username && (
				<>
					<NavbarToggler
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					/>
					<Collapse isOpen={isOpen} navbar>
						<Nav style={{ width: "100%" }} navbar>
							{navs.map(nav => <CustomLink key={nav.to} {...nav}/>)}
						</Nav>
						<Button
							onClick={toggle}
							className="ms-auto me-4"
						>
							<FontAwesomeIcon icon={faQrcode} />
						</Button>
						<Button
							onClick={() =>
								logoutUser(userContext.dispatch)
							}
						>
							Logout
						</Button>
					</Collapse>
				</>
			)}
			<QRCodeComponent modal={modal} toggle={toggle}/>
		</Navbar>
	);
}
