import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SingUp } from "../assets/services/axios";

export default function Cadastro() {
	const [user, setUser] = useState({
		email: "",
		name: "",
		cpf: "",
		password: "",
	});

	const navigate = useNavigate();

	function formatCpf(CPF) {
		CPF.replace(/\D/g, "")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1-$2")
			.replace(/(-\d{2})\d+?$/, "$1");
		console.log(CPF);
		return setUser({
			...user,
			cpf: CPF,
		});
	}

	function SendForm(event) {
		event.preventDefault();
		console.log(user);
		SingUp(user)
			.then((response) => {
				console.log(response);
				Redirect();
			})
			.catch((err) => {
				console.log(err);
				alert("Erro ao cadastrar");
			});
	}
	function Redirect() {
		navigate("/", { replace: true });
	}
	return (
		<>
			<StyledForm>
				<form onSubmit={SendForm}>
					<input
						type="text"
						placeholder="Nome"
						name="name"
						onChange={(e) => {
							setUser({
								...user,
								[e.target.name]: e.target.value,
							});
						}}
					/>
					<input
						type="cpf"
						placeholder="CPF"
						name="cpf"
						onChange={(e) => {
							formatCpf(e.target.value);
						}}
					/>
					<input
						type="email"
						placeholder="E-mail"
						name="email"
						onChange={(e) => {
							setUser({
								...user,
								[e.target.name]: e.target.value,
							});
						}}
					/>
					<input
						type="password"
						placeholder="Senha"
						name="password"
						onChange={(e) => {
							setUser({
								...user,
								[e.target.name]: e.target.value,
							});
						}}
					/>

					<button type="submit">CADASTRAR</button>
				</form>
				<StyledLink className="link">
					<Link to="/">Já possuí uma conta? Entre</Link>
				</StyledLink>
			</StyledForm>
		</>
	);
}
const StyledForm = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 150px;
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
	margin-top: 30px;
	font-weight: 400;
	font-size: 14px;
	text-decoration-line: underline;

	color: #ffffff;
`;
