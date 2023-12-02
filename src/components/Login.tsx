import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";
import { Button, PopoverBody, Spinner, UncontrolledPopover } from "reactstrap";
import { setUserLoading } from "../actions/userActions";

export default function Login(): React.JSX.Element {
    const userContext = useContext(UserContext);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center activity">
            <Button 
                color="primary" 
                disabled={userContext.user.isLoading} 
                className="mt-auto mb-auto" 
                href="http://localhost:8080/jukebox/public/login"
                onClick={() => setUserLoading(userContext.dispatch)}
            >
                {userContext.user.isLoading ? 
                    <Spinner/> :
                    "Login with spotify"
                }
            </Button>
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
