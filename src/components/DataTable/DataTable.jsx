import { PrimeDataTable } from "@/primeComponents/PrimeDataTable/PrimeDataTable";

import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

export const DataTable = ({
	columns,
	data,
	textAddButton,
	onAddModal,
	onUpdate,
	buttonDecline,
	buttonSuccess,
	buttonEye,
	onDelete,
	showEditButton = false,
	showDeleteButton = false,
	showEye = false,
	specialButton = false,
	createModal = false,
	buttonExcel = true,
	paginator = true,
	createButton = false,
	createOnClick = false,
	onCreate,
}) => {
	return (
		<SectionStructure>
			{/* Header de la tabla (botones y buscador) */}
			{(buttonExcel || createButton) && (
				<HeaderDataTable
					textAddButton={textAddButton}
					onAddModal={onAddModal}
					specialButton={specialButton}
					createModal={createModal}
					createOnClick={createOnClick}
					createButton={createButton}
					buttonExcel={buttonExcel}
					onCreate={onCreate}
				/>
			)}

			{/* Tabla */}
			<PrimeDataTable
				columns={columns}
				data={data}
				onUpdate={onUpdate}
				onDelete={onDelete}
				paginator={paginator}
				showDeleteButton={showDeleteButton}
				showEditButton={showEditButton}
				showEye={showEye}
				buttonDecline={buttonDecline}
				buttonSuccess={buttonSuccess}
				buttonEye={buttonEye}
			/>
		</SectionStructure>
	);
};
