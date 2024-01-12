import "./App.scss";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserContextProvider } from "./providers/UserContextProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import CustomerHome from "./components/CustomerHome.tsx";
import RequireAuth from "./providers/RequireAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<UserContextProvider>
			<Routes>
				<Route element={<App/>}>
					<Route path="/" element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/:username" element={<CustomerHome/>}/>
				</Route>
			</Routes>
		</UserContextProvider>
	</BrowserRouter>,
);
  
