import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Context from "../assets/services/Context";
import GlobalStyles from "../assets/GlobalStyles";
import Login from "./Login";
import Home from "./Home";
import Cadastro from "./Cadastro";
import Planos from "./Planos";
import Plano from "./Plano";
import User from "./User";

export default function App() {
	const [user, setUser] = useState();
	return (
		<>
			<GlobalStyles />
			<Context.Provider value={{user, setUser}}>
				<BrowserRouter>
					<Routes>
						<Route path={"/"} element={<Login />} />
						<Route path={"/sing-up"} element={<Cadastro />} />
						<Route path={"/subscriptions"} element={<Planos />} />
						<Route path={"/subscriptions/:id"} element={<Plano />} />
						<Route path={"/home "} element={<Home />} />
						<Route path={"/users/:UserId"} element={<User />} />
					</Routes>
				</BrowserRouter>
			</Context.Provider>
		</>
	);
}
