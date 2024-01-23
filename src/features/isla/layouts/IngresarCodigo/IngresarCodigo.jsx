import React, { useEffect, useState } from "react";
import style from "./IngresarCodigo.module.css";
import axios from "axios";
import useModal from "@/hooks/useModal";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

import { CustomButton } from "@/components/CustomButton/CustomButton";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { url } from "@/connections/mainApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDateValidate, setDetalleTransaccion } from "@/store/slices/isla/islaSlice";

const IngresarCodigo = ({ nextStep }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showModal, hideModal, visible } = useModal();

	const [placa, setPlaca] = useState({ placa: "" });
	const [disablePlaca, setDisablePlaca] = useState(false);

	const [disableCodigo, setDisableCodigo] = useState(true);
	const [errorPlaca, setErrorPlaca] = useState("");

	const [codigo, setCodigo] = useState({ codigo: "" });
	const [errorCodigo, setErrorCodigo] = useState("");

	const [operacionCorrecta, setOperacionCorrecta] = useState(false);

	// postFetchData, errorPost
	const verificarPlaca = async () => {
		try {
			const resp = await axios.post(`${url}/transaccion/isla/placa`, placa);
			if (resp.status === 201) {
				setDisableCodigo(false);
				setErrorPlaca("");
				setDisablePlaca(true);
			}
		} catch (error) {
			const respError = error.response.data.message;
			setErrorPlaca(respError);
			console.log(respError);
		}
	};

	const actualizarPlaca = (text) => {
		setPlaca({ placa: text });
		hideModal();
	};

	const verificarCompra = async () => {
		const compra = {
			placa: placa.placa,
			codigo: codigo.codigo,
		};

		try {
			const resp = await axios.post(`${url}/transaccion/isla/validar-compra`, compra);
			if (resp.status === 201) {
				dispatch(setDetalleTransaccion(resp.data));
				setDisableCodigo(false);
				setErrorCodigo("");
				setOperacionCorrecta(true);
				dispatch(setDateValidate(compra))
			}
		} catch (error) {
			const respError = error.response.data.message;
			setErrorCodigo(respError);
			console.log(respError);
		}
	};

	const refreshInitState = () => {
		setPlaca({ placa: "" });
		setDisablePlaca(false);
		setDisableCodigo(true);
		setErrorPlaca("");
		setCodigo({ codigo: "" });
		setErrorCodigo("");
		setOperacionCorrecta(false);
	};

	useEffect(() => {
		if (operacionCorrecta) {
			refreshInitState();
			nextStep();
		}
	}, [operacionCorrecta]);

	return (
		<>
			<div className={style.login__container}>
				<h2 className={style.login__title}>Bienvenido a mi totem</h2>

				<TextBoxField
					textLabel="Placa:"
					direction="row"
					labelWidth="140px"
					name="placa"
					value={placa.placa}
					onChange={(e) => handleChangeInput(e, setPlaca)}
					disabled={disablePlaca}
					errorText={errorPlaca}
				/>

				<TextBoxField
					textLabel="Código de compra:"
					direction="row"
					labelWidth="140px"
					name="codigo"
					value={codigo.codigo}
					onChange={(e) => handleChangeInput(e, setCodigo)}
					disabled={disableCodigo}
					errorText={errorCodigo}
				/>

				{disableCodigo === true ? (
					<div className={style.buttons__container}>
						<CustomButton
							text="Verificar placa"
							onClick={() => verificarPlaca()}
							backgroundButton="var(--button-color)"
							colorP="#fff"
						/>
						<CustomButton
							text="Ingresa la placa correcta"
							onClick={() => showModal()}
							backgroundButton="var(--button-color-warning)"
							colorP="#fff"
						/>
					</div>
				) : (
					<CustomButton
						text="Confirmar compra"
						onClick={() => verificarCompra()}
						backgroundButton="var(--button-color)"
						colorP="#fff"
					/>
				)}
			</div>

			<PrimeModal header="Cambiar placa correcta" modalStatus={visible} onHideModal={hideModal}>
				<AddModal postFetchData={actualizarPlaca} />
			</PrimeModal>
		</>
	);
};

export default React.memo(IngresarCodigo);
