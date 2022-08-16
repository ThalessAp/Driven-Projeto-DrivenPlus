import { createContext } from "react";


const Context = createContext();
localStorage.setItem("token", `${Context.token}`);
localStorage.setItem("user", JSON.stringify(`${Context.user}`));

export default Context;
