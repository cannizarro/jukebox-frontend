import "./App.scss";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserContextProvider } from "./providers/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<UserContextProvider>
		<App />
	</UserContextProvider>,
);
