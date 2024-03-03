import { useContext, useState } from "react";
import {
	Collapse,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler
} from "reactstrap";
import { logoutUser } from "../../actions/userActions";
import { UserContext } from "../../providers/UserContextProvider";
import { APP_NAME } from "../../constants/constants";
import CustomLink, { LinkPropType } from "./CustomLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getImageUrl } from "../../utils/genericUtils";
import QRDisplay from "../dashboard/QR/QRDisplay";

export default function AppNavbar() {
	const userContext = useContext(UserContext);
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
				href={userContext.user.username ? "/" : ""}
			>
				<img src={getImageUrl("logo.svg")} className="logo" />
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
							setIsNavbarOpen(!isNavbarOpen);
						}}
					/>
					<Collapse isOpen={isNavbarOpen} navbar>
						<Nav style={{ width: "100%" }} navbar>
							{
								navs.map((nav, index, array) => 
									<CustomLink 
									key={nav.to} 
									isLast={array.length-1===index} 
									{...nav}
									/>
								)
							}
							<Dropdown 
							nav 
							className="ms-2"
							isOpen={isDropdownOpen}
							toggle={() => setIsDropdownOpen(!isDropdownOpen)}
							>
								<DropdownToggle nav caret className={ isDropdownOpen ? "text-light" : "text-muted-light"}>
									Actions
								</DropdownToggle>
								<DropdownMenu >
									<DropdownItem onClick={toggle}>
										<FontAwesomeIcon className="me-2" icon={faQrcode} />
										Show QR
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem onClick={() => logoutUser(userContext.dispatch)}>
										<FontAwesomeIcon className="me-2" icon={faRightFromBracket} />
										Logout
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Nav>
					</Collapse>
				</>
			)}
			<QRDisplay modal={modal} toggle={toggle}/>
		</Navbar>
	);
}
