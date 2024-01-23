import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import style from "./PrimeSelectRow.module.css";

export function PrimeSelectRow({
	data,
	selectedProduct,
	setSelectedProduct,
	precioFisico,
	onDelete,
	onUpdate,
}) {
	const buttonSuccess = (rowData) => {
		return (
			<Button
				className="p-button-info p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-pencil"
				onClick={() => onUpdate(rowData)}
			/>
		);
	};

	const buttonDecline = (rowData) => {
		return (
			<Button
				className="p-button-danger p-button-rounded"
				style={{ width: "40px", height: "40px" }}
				type="button"
				icon="pi pi-ban"
				onClick={() => {
					onDelete(rowData.id);
				}}
			/>
		);
	};

	return (
		<DataTable
			value={data}
			selectionMode="single"
			selection={selectedProduct}
			onSelectionChange={(e) => setSelectedProduct(e.value)}
			dataKey="id"
			metaKeySelection={false}
			tableStyle={{ minWidth: "35rem" }}
			emptyMessage="No se encontro registros."
		>
			<Column
				header="Descuento /gal"
				body={(rowData) => {
					return <div>S/. {rowData.discount}</div>;
				}}
			/>
			<Column
				header="Rango de Compra"
				body={(rowData) => {
					return (
						<div className={style.container__1}>
							{`DE: S/. ${rowData.startRange} - A: S/. ${rowData.endRange}`}
						</div>
					);
				}}
			/>
			<Column
				header="PVP Mitotem /gal"
				body={(rowData) => {
					return (
						<div className={style.container__1}>{`S/. ${(precioFisico - rowData.discount).toFixed(
							2
						)}`}</div>
					);
				}}
			/>

			<Column style={{ width: "70px" }} body={buttonSuccess} />
			<Column style={{ width: "70px" }} body={buttonDecline} />
		</DataTable>
	);
}
