import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

export const PrimeDataTable = ({
	columns,
	data,
	buttonDecline,
	buttonSuccess,
	onUpdate,
	onDelete,
	showEditButton = false,
	showDeleteButton = false,
	paginator = true,
}) => {
	const [dataTable, setDataTable] = useState(data);

	useEffect(() => {
		setDataTable(data);
	}, [data]);

	// Función para obtener las columnas adicionales para los botones de acción
	const getActionColumns = () => {
		const actionColumns = [];
		if (showEditButton) {
			actionColumns.push(
				<Column key="editButton" style={{ width: "5rem" }} body={buttonSuccess} />
			);
		}
		if (showDeleteButton) {
			actionColumns.push(
				<Column key="deleteButton" style={{ width: "5rem" }} body={buttonDecline} />
			);
		}
		return actionColumns;
	};

	return (
		<>
			<DataTable
				value={dataTable}
				paginator={paginator}
				rows={7}
				dataKey="id"
				responsiveLayout="scroll"
				emptyMessage="No se han encontrado resultados."
			>
				{/* Resto de las columnas */}
				{columns &&
					columns.map((column) => (
						<Column
							key={`${column.campo}`}
							sortable
							field={column.campo}
							body={column.body}
							header={column.nombre}
							style={{
								minWidth: "10rem",
							}}
						/>
					))}

				{/* Columnas para los botones de acción (agregadas automáticamente si es necesario) */}
				{getActionColumns()}
			</DataTable>
		</>
	);
};
