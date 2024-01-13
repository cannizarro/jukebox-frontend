import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserContextProvider";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { loginUser, registerUser, setUserLoading } from "../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";

export default function Login() {
	const userContext = useContext(UserContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();

	useEffect(() => {
		loginUser(userContext.dispatch).catch(() => {
			if (searchParams.get("code") && searchParams.get("state")) {
				return registerUser(userContext.dispatch, searchParams)
							.then(() => setSearchParams({}));
			}
		});
	}, [userContext.dispatch, searchParams, setSearchParams]);

	return userContext.user.username ?
		<Navigate to={location.state?.from ? location.state.from : "/"} replace/> : 
		(
			<div
				className="d-flex flex-column justify-content-center align-items-center activity"
			>
				{userContext.user.isLoading ? (
					<div className="dot-pulse m-auto" />
				) : (
					<Button
						color="primary"
						className="m-auto"
						href="http://localhost:8080/jukebox/public/login"
						onClick={() => setUserLoading(userContext.dispatch)}
					>
						<FontAwesomeIcon icon={faSpotify} className="me-2" />
						Login with spotify
					</Button>
				)}
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
