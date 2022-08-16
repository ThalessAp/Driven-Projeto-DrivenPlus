import axios from "axios";

const Api = "https://mock-api.driven.com.br/api/v4/driven-plus";

function SingUp(user) {
	const promisse = axios.post(
		`${Api}/auth/sign-up`,
		user
	);
	return promisse;
}
function SingIn(user) {
	const promisse = axios.post(`${Api}/auth/login`, user);
	return promisse;
}

function GetSubcriptions(token) {
	console.log(token);
	const promisse = axios.get(`${Api}/subscriptions/memberships`, token);
	return promisse;
}

function GetSubcription(id, token) {
	console.log(token);
	const promisse = axios.get(`${Api}/subscriptions/memberships/${id}`, token);
	return promisse;
}
function Signature(user, token) {
	const promisse = axios.post(`${Api}/subscriptions`, user, token);
	return promisse;
}

function UpdadeSignature(user, token) {
	// Esse link é o msm msm??
	const promisse = axios.post(`${Api}/subscriptions`, user, token);
	return promisse;
}
function DeleteSignature(token) {
	const promisse = axios.delete(`${Api}/subscriptions`, token);
	return promisse;
}

export {
	SingUp,
	SingIn,
	GetSubcriptions,
	GetSubcription,
	Signature,
	UpdadeSignature,
	DeleteSignature,
};
