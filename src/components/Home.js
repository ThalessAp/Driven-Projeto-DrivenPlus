import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DeleteSignature, GetSubcription } from "../assets/services/axios";
import UserImg from "../assets/img/UserImg.svg";
import styled from "styled-components";

export default function Home({ token, user }) {
	const User = JSON.parse(user);
	const [plano, setPlano] = useState();
	const id = useParams();
	const UserId = useParams();
	const Token = {
		config: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	};
	const navigate = useNavigate();
	useEffect(() => {
		GetSubcription(id, Token)
			.then((response) => {
				setPlano(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	function CancelPlan() {
		DeleteSignature(Token)
			.then((response) => {
				console.log(response);
				alert("Assinatura cancelada com sucesso!");
				navigate("/subscriptions", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<div className="main">
				<Header className="header">
					<div className="img">
						<img src={plano.image} alt="Plano" />
					</div>
					<div
						className="userImg"
						onClick={() => navigate(`/user/${UserId}`, { replace: true })}>
						<img src={UserImg} alt="User" />
					</div>
				</Header>
				<Name className="name">
					<h1>Olá, {User.name}</h1>
				</Name>
				<Content className="content">
					<Perks className="perks">
						{plano.perks.map((perk) => {
							return (
								<>
									<a href={perk.link} target="_blank" rel="noreferrer">
										<div className="perk">
											<h2>{perk.title}</h2>
										</div>
									</a>
								</>
							);
						})}
					</Perks>
					<Options className="options">
						<div
							className="change"
							onClick={() => navigate(`/subscriptions`, { replace: true })}>
							<h2>Alterar Plano</h2>
						</div>
						<div className="cancel" onClick={() => CancelPlan}>
							<h2>Cancelar Assinatura</h2>
						</div>
					</Options>
				</Content>
			</div>
		</>
	);
}
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Name = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	margin-bottom: 45px;
	h1 {
		font-weight: 700;
		font-size: 24px;

		color: #ffffff;
	}
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;
const Perks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 90%;

	a {
		text-decoration: none;
		height: 52px;
		color: #fff;
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ff4791;
			border-radius: 8px;
			h2 {
				font-weight: 700;
				font-size: 14px;

				color: #ffffff;
			}
		}
	}
`;
const Options = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 90%;
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		h2 {
			font-weight: 700;
			font-size: 14px;

			color: #ffffff;
		}
		.change {
			background: #ff4791;
		}
		.cancel {
			background: #ff4747;
		}
	}
`;
