import React from "react";
import style from "./HeaderDataTable.module.css";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const HeaderDataTable = ({
	textAddButton,
	onAddModal,
	createModal = false,
	specialButton = false,
	createButton = false,
	createOnClick = false,
	buttonExcel,
	onCreate,
	isSearch = true,
	additionalElementRight,
}) => {
	return (
		<Toolbar
			className="mb-4"
			left={
				<div className={style.buttonsLeft__container}>
					{createButton && (
						<Button
							label={"Crear Precio"}
							icon="pi pi-plus"
							className="p-button-sm p-button-info mr-2"
							onClick={createOnClick}
						/>
					)}

					{!!textAddButton ? (
						<Button
							label={textAddButton}
							icon="pi pi-plus"
							className="p-button-sm p-button-info mr-2"
							onClick={onCreate}
						/>
					) : null}

					{buttonExcel && (
						<Button
							label="EXPORTAR EXCEL"
							icon="pi pi-file-excel"
							className="p-button-sm p-button-success mr-2"
							onClick={onAddModal}
						/>
					)}
				</div>
			}
			right={
				<div>
					{isSearch && (
						<div className="flex justify-content-end">
							<span className="p-input-icon-left">
								<i className="pi pi-search" />
								<InputText type="search" placeholder="Buscar..." />
							</span>
						</div>
					)}

					{additionalElementRight ? additionalElementRight : <></>}
				</div>
			}
		/>
	);
};
