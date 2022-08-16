import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetSubcription, Signature } from "../assets/services/axios";
import Icon from "../assets/img/BackArrow.svg";
import Planner from "../assets/img/Planner.svg";
import Money from "../assets/img/Money.svg";
import Close from "../assets/img/CloseIcon.svg";

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
				<div className="overlay">
					<div className="icon">
						<img src={Close} alt="Fechar" />
					</div>
					<div className="overlay-content">
						<div className="text">
							<h5>
								`Tem certeza que deseja assinar o plano ${plano.name} (R$ $
								{plano.price}
								)?`
							</h5>
						</div>
						<div className="buttons">
							<div className="no">Não</div>
							<div className="yes" onClick={Subcribe}>
								Sim
							</div>
						</div>
					</div>
				</div>
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
			<div className="main">
				<div className="icon">
					<img src={Icon} alt="Voltar" />
				</div>
				<div className="logo">
					<img src={plano.image} alt="Plano" />
				</div>
				<div className="title">
					<h1>{plano.name}</h1>
				</div>
				<div className="perks">
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
				</div>
				<div className="price">
					<div className="subtitle">
						<h2>
							<span>
								<img src={Money} alt="Money" />
								Preço: R$ {plano.price} cobrados mensalmente
							</span>
						</h2>
					</div>
				</div>

				<form onSubmit={Overlay}>
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
				</form>
			</div>
		</>
	);
}
