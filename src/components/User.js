import { useNavigate } from "react-router";
import Back from "../assets/img/BackArrow.svg";
export default function User({ user, token }) {
	const navigate = useNavigate();
	return (
		<>
			<div
				className="icon"
				onClick={() => navigate("/home", { replace: true })}>
				<img src={Back} alt="Back" />
			</div>
			<div className="info">
				<form>
					<input type="text" placeholder=" {user.name}" disabled />
					<input type="text" placeholder=" {user.cpf}" disabled />
					<input type="text" placeholder=" {user.email}" disabled />
				</form>
				<div
					className="update"
					onClick={() => navigate(`/users/planId/update`, { replace: true })}>
					<h2>ATUALIZAR</h2>
				</div>
			</div>
		</>
	);
}
