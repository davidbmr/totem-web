import React from "react";
import axios from "axios";
import style from "./ConfirmarTransaccion.module.css";

import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { declineEtapa, resetState } from "@/store/slices/isla/islaSlice";
import { url } from "@/connections/mainApi";

const ConfirmarTransaccion = ({ reiniciarCronometro, detenerCronometro, tiempoRestante }) => {
	const dispatch = useDispatch();
	const { detalleTransaccion, cod_compra, placa } = useSelector((state) => state.isla);

	const rechazarOperacion = () => {
		dispatch(declineEtapa());
	};

	const confirmTransaction = async (id) => {
		const resp = await axios.patch(`${url}/transaccion/isla/validar-compra/${id}`, {
			placa: placa,
			codigo: cod_compra,
		});

		if (resp.status === 200) {
			dispatch(resetState());
			reiniciarCronometro();
			detenerCronometro();
		}
	};

	return (
		<div className={style.login__container}>
			<h2 className={style.login__title}>¡Listo, muchas gracias!</h2>

			<p className={style.datetime__text}>Te quedan {tiempoRestante} minutos</p>

			<div className={style.button__container}>
				<Button
					label="Transacción finalizada"
					onClick={() => confirmTransaction(detalleTransaccion?.id)}
				/>
				<Button label="Transacción interrumpida" onClick={rechazarOperacion} />
			</div>
		</div>
	);
};

export default React.memo(ConfirmarTransaccion);
