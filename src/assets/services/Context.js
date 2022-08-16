import { createContext } from "react";

const Context = createContext({
	token:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEyLCJpYXQiOjE2NjAzNDU0ODB9.f51cdY0XOpcbV8YbIza2-UjfU9rUfxPYKIXTZK4qNrs",
});
localStorage.setItem("token", `${Context.token}`);
localStorage.setItem("user", JSON.stringify(`${Context.user}`));


export default Context;
