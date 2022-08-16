import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetSubcription, Signature } from "../assets/services/axios";
import Icon from "../assets/img/BackArrow.svg";
import Planner from "../assets/img/Planner.svg";
import Money from "../assets/img/Money.svg";
import Close from "../assets/img/CloseIcon.svg";
import styled from "styled-components";

export default function Plano(token) {
	const [plano, setPlano] = useState([]);
	const [form, setForm] = useState({
		cardName: "",
		cardNumber: "",
		securityNumber: "",
		expirationDate: "",
	});

	const id = useParams();
	const Token = {
		config: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	};
	useEffect(() => {
		GetSubcription(id, Token)
			.then((response) => {
				setPlano(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	function handleForm(e) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function Overlay(e) {
		e.preventDefault();

		return (
			<>
				<StyledOverlay className="overlay">
					<div className="icon">
						<img src={Close} alt="Fechar" />
					</div>
					<OverlayContent className="overlay-content">
						<div className="text">
							<h5>
								`Tem certeza que deseja assinar o plano ${plano.name} (R$ $
								{plano.price}
								)?`
							</h5>
						</div>
						<OverlayButtons className="buttons">
							<div className="no">Não</div>
							<div className="yes" onClick={Subcribe}>
								Sim
							</div>
						</OverlayButtons>
					</OverlayContent>
				</StyledOverlay>
			</>
		);
	}
	function Subcribe(e) {
		e.preventDefault();
		console.log(form);
		Signature(form, Token)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<Main className="main">
				<StyledIcon className="icon">
					<img src={Icon} alt="Voltar" />
				</StyledIcon>
				<Logo>
					<div className="logo">
						<img src={plano.image} alt="Plano" />
					</div>
					<div className="title">
						<h1>{plano.name}</h1>
					</div>
				</Logo>

				<Perks className="perks">
					<div className="subtitle">
						<h2>
							<span>
								<img src={Planner} alt="Planner" />
								Benefícios:
							</span>
						</h2>
					</div>
					{plano.perks.map((perk) => {
						return (
							<>
								<a href="{perk.link}" className="perk">
									<h3>
										` ${perk.id}. ${perk.title}`
									</h3>
								</a>
							</>
						);
					})}
				</Perks>
				<Price className="price">
					<div className="subtitle">
						<h2>
							<span>
								<img src={Money} alt="Money" />
								Preço:
							</span>
						</h2>
						<h3>R$ {plano.price} cobrados mensalmente</h3>
					</div>
				</Price>

				<Form onSubmit={Overlay}>
					<input
						type="text"
						placeholder="Nome impresso no cartão"
						name="cardName"
						onChange={handleForm}
						value={form.cardName}
					/>
					<input
						type="text"
						placeholder="Digitos do cartão"
						name="cardNumber"
						onChange={handleForm}
						value={form.cardNumber}
					/>
					<input
						type="text"
						placeholder="Codigo de segurança"
						name="securityNumber"
						onChange={handleForm}
						value={form.securityNumber}
					/>
					<input
						type="text"
						placeholder="Validade"
						name="expirationDate"
						onChange={handleForm}
						value={form.expirationDate}
					/>
					<button type="submit">ASSINAR</button>
				</Form>
			</Main>
		</>
	);
}
const Main = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledIcon = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 20px 25px;
`;
const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 140px;
		height: 95px;
		object-fit: fill;
	}
	h1 {
		font-weight: 700;
		font-size: 32px;
		color: #ffffff;
	}
`;
const Perks = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	font-weight: 400;
	color: #ffffff;

	h2 {
		font-size: 16px;
	}
	h3 {
		font-size: 14px;
	}
`;
const Price = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	font-weight: 400;
	color: #ffffff;

	h2 {
		font-size: 16px;
	}
	h3 {
		font-size: 14px;
	}
`;
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;

	font-size: 14px;
	border-radius: 8px;

	input {
		font-weight: 400;
		color: #7e7e7e;
		background: #ffffff;
	}
	button {
		font-weight: 700;
		color: #ffffff;
		background: #ff4791;
	}
`;
const StyledOverlay = styled.div`
	z-index: 2;
	display: flex;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	background: rgba(0, 0, 0, 0.7);

	.icon {
		display: flex;
		justify-content: flex-end;
		background: #ffffff;
	}
`;
const OverlayContent = styled.div`
	display: flex;
	justify-content: center;
	width: 248px;
	height: 210px;

	padding: 20px;
	background: #ffffff;
	border-radius: 12px;

	.text {
		font-weight: 700;
		font-size: 18px;
		text-align: center;
		color: #000000;
	}
`;
const OverlayButtons = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 18px 122px;
	gap: 10px;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95px;
		height: 52px;
		border-radius: 8px;
		color: #fff;
		.no {
			background: #cecece;
		}
		.yes {
			background: #ff4791;
		}
	}
`;
