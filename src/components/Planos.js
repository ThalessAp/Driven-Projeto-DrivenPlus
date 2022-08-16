import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { GetSubcriptions } from "../assets/services/axios";

export default function Planos({ token }) {
	const [plano, setPlano] = useState([]);
	const navigate = useNavigate();

	const Token = {
		config: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	};
	useEffect(() => {
		GetSubcriptions(Token)
			.then((response) => {
				setPlano(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Main className="main">
				<Title className="title">
					<h1>Escolha seu Plano</h1>
				</Title>
				<StyledPlanos className="planos">
					{plano.map((plano, index) => {
						return (
							<>
								<div
									className="plano"
									onClick={() => {
										navigate(`/subscriptions/${plano.id}`, { replace: true });
									}}>
									<Plano key={index} image={plano.image} price={plano.price} />
								</div>
							</>
						);
					})}
				</StyledPlanos>
			</Main>
		</>
	);
}

function Plano({ image, price }) {
	return (
		<>
			<StyledPlano className="plano">
				<Img className="plano-image">
					<img src={image} alt="Plano" />
				</Img>
				<Price className="plano-price">
					<h2>R$ {price}</h2>
				</Price>
			</StyledPlano>
		</>
	);
}
const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	h1 {
		font-weight: 700;
		font-size: 32px;

		color: #ffffff;
	}
`;
const StyledPlanos = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	overflow-x: scroll;
`;

const StyledPlano = styled.div`
	display: flex;
	width: 290px;
	height: 180px;
	padding: 40px 15px;

	background: #0e0e13;
	border: 3px solid #7e7e7e;
	border-radius: 12px;
`;
const Img = styled.div`
	width: 100%;
	height: 100%;
	img {
		object-fit: fill;
	}
`;
const Price = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		font-weight: 700;
		font-size: 24px;
		color: #ffffff;
	}
`;
