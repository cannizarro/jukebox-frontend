import "./App.scss";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserContextProvider } from "./providers/UserContextProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/dashboard/Home.tsx";
import Login from "./components/Login.tsx";
import CustomerHome from "./components/customer/CustomerHome.tsx";
import RequireAuth from "./providers/RequireAuth.tsx";
import Transactions from "./components/dashboard/Transactions.tsx";

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
					<Route path="/transactions" element={<RequireAuth><Transactions/></RequireAuth>}/>
				</Route>
			</Routes>
		</UserContextProvider>
	</BrowserRouter>,
);
  
