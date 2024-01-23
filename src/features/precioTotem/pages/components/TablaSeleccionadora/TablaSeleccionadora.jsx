import React, { useEffect, useState } from "react";
import style from "./TablaSeleccionadora.module.css";

import useModal from "@/hooks/useModal";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useUpdateFetch } from "@/hooks/useUpdateFetch";
import { useDeleteFetch } from "@/hooks/useDeleteFetch";
import { AddModal } from "../../AddModal/AddModal";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { PrimeSelectRow } from "@/primeComponents/PrimeSelectRow/PrimeSelectRow";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { UpdateModal } from "../../UpdateModal/UpdateModal";

export const TablaSeleccionadora = ({
	title,
	listaPrecioFisico,
	combustible,
	listaCombustiblesId,
	tipo_pago,
	listaPagosId,
	preciosMiTotemFetch,
}) => {
	const addModal = useModal();
	const updateModal = useModal();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [precioFisico, setPrecioFisico] = useState(0);
	const [infoDataId, setInfoDataId] = useState({ combustible: {}, tipo_pago: {} });

	const { postFetchData } = usePostFetch(
		"/price-my-totem",
		"Precio MiTotem",
		preciosMiTotemFetch.reloadFetchData,
		addModal
	);

	const { updateFetchData } = useUpdateFetch(
		"/price-my-totem",
		"Precio MiTotem",
		preciosMiTotemFetch.reloadFetchData,
		updateModal
	);

	const { deleteFetchData } = useDeleteFetch(
		"/price-my-totem",
		"Precio MiTotem",
		preciosMiTotemFetch.reloadFetchData
	);

	useEffect(() => {
		if (combustible === "PREMIUM") setPrecioFisico(listaPrecioFisico.pricePremium);
		if (combustible === "REGULAR") setPrecioFisico(listaPrecioFisico.priceRegular);
		if (combustible === "DIESEL") setPrecioFisico(listaPrecioFisico.priceDiesel);
		if (combustible === "GLP") setPrecioFisico(listaPrecioFisico.priceGLP);
	}, [listaPrecioFisico]);

	useEffect(() => {
		if (listaCombustiblesId) {
			const combustibleInfoFiltered = listaCombustiblesId.find(
				(element) => element.fuelName == combustible
			);
			setInfoDataId((prev) => ({ ...prev, combustible: combustibleInfoFiltered }));
		}
	}, [listaCombustiblesId]);

	useEffect(() => {
		if (listaPagosId) {
			const tipoPagoInfoFiltered = listaPagosId.find(
				(element) => element.paymentFormatName == tipo_pago
			);
			setInfoDataId((prev) => ({ ...prev, tipo_pago: tipoPagoInfoFiltered }));
		}
	}, [listaPagosId]);

	// *--Setear la data para mostrar datos en la tabla--*

	const [data, setData] = useState([]);
	const [updateData, setUpdateData] = useState([]);

	const updatedData = (payload) => {
		setUpdateData(payload);
		updateModal.showModal();
	};

	useEffect(() => {
		if (preciosMiTotemFetch?.data) {
			// busca la tabla seleccionada y setea la data para mostrar en la tabla
			const findTable = preciosMiTotemFetch?.data.find(
				(tabla) => tabla?.combustible == combustible && tabla.tipo_pago == tipo_pago
			);
			setData(findTable?.data);
		}
	}, [preciosMiTotemFetch?.data]);

	return (
		<>
			<ContentBox>
				<HeaderDataTable
					isSearch={false}
					textAddButton="AGREGAR DESCUENTO"
					onCreate={() => addModal.showModal()}
					additionalElementRight={<p className={style.title__table}>{title}</p>}
				/>
				<PrimeSelectRow
					data={data}
					selectedProduct={selectedProduct}
					setSelectedProduct={setSelectedProduct}
					precioFisico={precioFisico}
					onDelete={deleteFetchData}
					onUpdate={(rowData) => updatedData(rowData)}
				/>
			</ContentBox>

			{/* Add Modal */}
			<PrimeModal
				header="Agregar descuento"
				modalStatus={addModal.visible}
				onHideModal={addModal.hideModal}
			>
				<AddModal postFetchData={postFetchData} infoDataId={infoDataId} data={data} />
			</PrimeModal>

			{/* Update Modal */}
			<PrimeModal
				header="Actualizar descuento"
				modalStatus={updateModal.visible}
				onHideModal={updateModal.hideModal}
			>
				<UpdateModal
					updateFetchData={updateFetchData}
					infoDataId={infoDataId}
					data={data}
					updateData={updateData}
				/>
			</PrimeModal>
		</>
	);
};
