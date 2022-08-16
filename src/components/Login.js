import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SingIn } from "../assets/services/axios";
import Context from "../assets/services/Context";
import Logo from "../assets/img/DrivenLogo.svg";

export default function Login() {
	const navigate = useNavigate();
	const {user, setUser }= useContext(Context);

	function SendForm(event) {
		event.preventDefault();

		SingIn(user)
			.then((response) => {
				console.log(response);
				//setUser({...response.data});

				response.data.membership
					? navigate("/home", { replace: true })
					: navigate("/subscriptions", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/home", { replace: true });
		}
	});

	return (
		<>
			<Main>
				<StyledLogo className="logo">
					<img src={Logo} alt="Driven" />
				</StyledLogo>
				<Form className="login">
					<form onSubmit={SendForm}>
						<input
							type="email"
							placeholder="E-mail"
							onChange={(e) => {
								setUser({
									...user,
									email: e.target.value,
								});
							}}
						/>
						<input
							type="password"
							placeholder="Senha"
							onChange={(e) => {
								setUser({
									...user,
									password: e.target.value,
								});
							}}
						/>

						<button type="submit">Entrar</button>
					</form>
				</Form>
				<StyledLink>
					<Link to="/sing-up">Não possuí uma conta? Cadastre-se</Link>
				</StyledLink>
			</Main>
		</>
	);
}
const Main = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledLogo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 100px auto;
`;
const Form = styled.div`
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		input {
			width: 300px;
			height: 55px;
			font-weight: 400;
			font-size: 14px;
			color: #7e7e7e;

			margin-bottom: 15px;
			background: #ffffff;
			border-radius: 8px;
			padding-left: 10px;
		}
		button {
			padding: 18px 122px;
			gap: 10px;

			width: 300px;
			height: 52px;
			background: #ff4791;
			border-radius: 8px;
			font-weight: 700;
			font-size: 14px;
			color: #ffffff;
		}
	}
`;
const StyledLink = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 25px;
	a {
		font-weight: 400;
		font-size: 14px;
		line-height: 16px;
		text-decoration-line: underline;

		color: #ffffff;
		:hover {
			cursor: pointer;
		}
	}
`;
