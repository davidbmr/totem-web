import React, { useEffect, useState } from "react";
import axios from "axios";
import useModal from "@/hooks/useModal";
import { url } from "@/connections/mainApi";

import { Button } from "primereact/button";
import { AddModal } from "./AddModal/AddModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const PadronOperarios = () => {
	const [data, setData] = useState();
	const [updateData, setUpdateData] = useState(null);

	const addModal = useModal();

	const fetchData = async () => {
		const URL = `${url}/operario`;
		try {
			const response = await axios.get(URL);
			setData(response?.data);
			console.log(response?.data);
		} catch (error) {
			console.log(error);
		}
	};
	const buttonSuccess = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-pencil"
				onClick={() => handleAction(rowData._id, "get")}
			/>
		);
	};

	const buttonDelete = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "40px", height: "40px", backgroundColor: "#dc3545", border: "#dc3545" }}
				type="button"
				icon="pi pi-trash"
				onClick={() => handleAction(rowData._id, "delete")}
			/>
		);
	};

	const handleAction = async (id, action) => {
		const URL = `${url}/operario/${id}`;
		try {
			const response = await axios[action](URL);

			if (action === "get") {
				addModal.showModal();
				setUpdateData(response.data);
			} else {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Padrón de operarios</h2>
				<hr />
				<DataTable
					columns={columns}
					textAddButton={"AGREGAR OPERARIO"}
					onCreate={addModal.showModal}
					data={data}
					isSearch={true}
					buttonSuccess={buttonSuccess}
					buttonDecline={buttonDelete}
				/>
			</MainContentStructure>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar operario"
				modalStatus={addModal.visible}
				onHideModal={addModal.hideModal}
			>
				<AddModal
					postFetchData={() => {}}
					hideModal={addModal.hideModal}
					fetchData={fetchData}
					updateData={updateData}
					setUpdateData={setUpdateData}
				/>
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "DNI", campo: "operarioDni" },
	{ nombre: "Nombre", campo: "operarioName" },
	{ nombre: "Apellido Paterno", campo: "operarioLastName" },
	{ nombre: "Apellido Materno", campo: "operarioLastNameMother" },
];
