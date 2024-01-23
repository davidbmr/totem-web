import React, { useState, useEffect } from "react";
import style from "./AddModal.module.css";
import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import axios from "axios";
import { url } from "@/connections/mainApi";

const initialData = {
	operarioDni: "",
	operarioName: "",
	operarioLastName: "",
	operarioLastNameMother: "",
};

export const AddModal = ({
	postFetchData,
	updateFetchData,
	updateData,
	hideModal,
	fetchData,
	setUpdateData,
}) => {
	const [newData, setNewData] = useState(initialData);
	const handleCreate = async () => {
		console.log(newData);
		const URL = `${url}/auth/registro-web-operario`;

		try {
			const response = await axios.post(URL, newData);
			setNewData(initialData);
			fetchData();
			hideModal();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		if (updateData) {
			const URL = `${url}/operario/${updateData?.id}`;

			try {
				const response = await axios.patch(URL, newData);
				setNewData(initialData);
				fetchData();
				hideModal();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewData({
			...newData,
			[name]: value,
		});
	};

	// Seteando el estado del input al data si existe el update
	useEffect(() => {
		if (updateData) {
			setNewData({ ...updateData });
			setUpdateData(null);
		}
	}, [updateData]);

	return (
		<div className={style.column__container}>
			<TextBoxField
				textLabel="DNI:"
				value={newData.operarioDni || ""}
				name="operarioDni"
				onChange={handleChange}
			/>

			<TextBoxField
				textLabel="Nombre:"
				value={newData.operarioName || ""}
				name="operarioName"
				onChange={handleChange}
			/>

			<TextBoxField
				textLabel="Apellido paterno:"
				value={newData.operarioLastName || ""}
				name="operarioLastName"
				onChange={handleChange}
			/>

			<TextBoxField
				textLabel="Apellido materno:"
				value={newData.operarioLastNameMother || ""}
				name="operarioLastNameMother"
				onChange={handleChange}
			/>

			{postFetchData && (
				<div>
					<Button
						className="p-button-sm p-button-info mr-2"
						onClick={!updateData ? handleCreate : handleUpdate}
					>
						{!updateData ? "AGREGAR OPERARIO" : "EDITAR OPERARIO"}
					</Button>
				</div>
			)}
		</div>
	);
};
