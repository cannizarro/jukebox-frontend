import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";

export default function Login(): React.JSX.Element {
    const userContext = useContext(UserContext);;
    return (
        <>
            {userContext.user.errorMessage && <p>{userContext.user.errorMessage}</p>}
            <a href="http://localhost:8080/jukebox/public/login">Login with spotify</a>
        </>
    );
}
