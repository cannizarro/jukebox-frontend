import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { setUserLoading } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function Login(): React.JSX.Element {
	const userContext = useContext(UserContext);
	return (
		<div className="d-flex flex-column justify-content-center align-items-center activity">
			{
				userContext.user.isLoading ?
					<div className="dot-pulse m-auto"/> :	
					<Button
						color="primary"
						className="m-auto"
						href="http://localhost:8080/jukebox/public/login"
						onClick={() => setUserLoading(userContext.dispatch)}
					>
						<FontAwesomeIcon icon={faSpotify} className="me-2"/>
						Login with spotify
					</Button>

			}
			<Button
				id="login-message"
				outline
				color="link"
				className="m-4"
				size="sm"
			>
				Show Message
			</Button>
			<UncontrolledPopover
				placement="top"
				target="login-message"
				trigger="legacy"
			>
				<PopoverBody>
					<p>Token has expired. Please log in again.</p>
				</PopoverBody>
			</UncontrolledPopover>
		</div>
	);
}
