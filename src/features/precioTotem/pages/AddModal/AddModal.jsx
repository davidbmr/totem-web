import React, { useEffect, useState } from "react";
import style from "./AddModal.module.css";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";

export const AddModal = ({ postFetchData, updateFetchData, updateData, infoDataId, data = [] }) => {
	let numberElements = data?.length || 0;
	let lastElementIndex = data?.length - 1 || 0;

	const [newData, setNewData] = useState({
		priceMyTotemDescuento: 0,
		priceMyTotemDesde: 0,
		priceMyTotemAsta: 0,
		fuelId: "",
		paymentFormatId: "",
	});

	const [errorDiscount, setErrorDiscount] = useState("");

	useEffect(() => {
		if (infoDataId) {
			setNewData((prev) => ({
				...prev,
				fuelId: infoDataId?.combustible?.id,
				paymentFormatId: infoDataId?.tipo_pago?.id,
			}));
		}
	}, [infoDataId]);

	const handleCreate = async () => {
		setErrorDiscount("");
		const dataCreate = {
			...newData,
			priceMyTotemDescuento: parseFloat(newData.priceMyTotemDescuento),
			priceMyTotemDesde: parseFloat(newData.priceMyTotemDesde),
			priceMyTotemAsta: parseFloat(newData.priceMyTotemAsta),
		};

		// validación de creación
		if (
			!dataCreate.priceMyTotemDescuento ||
			!dataCreate.priceMyTotemDesde ||
			!dataCreate.priceMyTotemAsta
		) {
			setErrorDiscount("Tienes que completar todos los elementos");
			return;
		}
		if (dataCreate.priceMyTotemDescuento <= data[lastElementIndex]?.discount) {
			setErrorDiscount("El valor de descuento debe de ser superior al anterior registro");
			return;
		}
		if (dataCreate.priceMyTotemDesde <= data[lastElementIndex]?.endRange) {
			setErrorDiscount("El valor DESDE debe que ser mayor al descuento anterior");
			return;
		}
		if (dataCreate.priceMyTotemAsta <= dataCreate.priceMyTotemDesde) {
			setErrorDiscount("El valor de HASTA debe de ser mayor al de DESDE");
			return;
		}

		postFetchData(dataCreate);
	};

	const handleChangeInput = (e) => {
		setNewData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="Descuento/gal:"
				value={newData.priceMyTotemDescuento || ""}
				name="priceMyTotemDescuento"
				onChange={handleChangeInput}
			/>

			<h3> Rango de Compra</h3>

			<div className={style.container__1}>
				<TextBoxField
					textLabel="Desde:"
					value={newData.priceMyTotemDesde || ""}
					name="priceMyTotemDesde"
					onChange={handleChangeInput}
				/>

				<TextBoxField
					textLabel="Hasta:"
					value={newData.priceMyTotemAsta || ""}
					name="priceMyTotemAsta"
					onChange={handleChangeInput}
				/>
			</div>

			{errorDiscount && <p className="msg-error">{errorDiscount}</p>}
			{postFetchData && (
				<div>
					<Button
						className="p-button-sm p-button-info mr-2"
						onClick={handleCreate}
						disabled={numberElements < 10 ? false : true}
					>
						AGREGAR DESCUENTO
					</Button>
				</div>
			)}
		</div>
	);
};
