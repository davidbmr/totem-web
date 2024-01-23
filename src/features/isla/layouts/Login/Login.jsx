import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { handleChangeInput } from "@/helpers/handleTextBox";

import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";

export const Login = ({ nextStep }) => {
	const [error, setError] = useState("");

	const [loginData, setLoginData] = useState({
		operarioDni: "",
	});

	const handleLogin = async () => {
		try {
			if (loginData.operarioDni.length !== 8) {
				setError("El DNI ingresado debe de tener 8 dígitos");
				return;
			}
			const resp = await axios.post(`${url}/auth/login-web-operario`, loginData);
			if (resp?.data.token) {
				nextStep();
			}
		} catch (error) {
			const respError = error.response.data.message;
			setError(respError);
			console.log(respError);
		}
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError("");
			}, 7000);
		}
	}, [error]);

	return (
		<div className={style.login__container}>
			<h2 className={style.login__title}>Inicia sesión</h2>

			<TextBoxField
				textLabel="DNI:"
				direction="row"
				labelWidth="50px"
				name="operarioDni"
				type="number"
				value={loginData.operarioDni}
				onChange={(e) => handleChangeInput(e, setLoginData)}
			/>
			{error && <p className="msg-error">{error}</p>}

			<CustomButton
				text="Siguiente"
				onClick={handleLogin}
				backgroundButton="var(--button-color)"
				colorP="#fff"
			/>

			<p className={style.warning__message}>
				Si el DNI no se encuentra registrado por favor, comunicate con el administrador de tu
				estación
			</p>
		</div>
	);
};
