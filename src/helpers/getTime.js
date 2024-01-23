export const getTime = (rowData) => {
	const fecha = new Date(rowData.created_at);
	const year = fecha.getFullYear();
	const month = fecha.getMonth() + 1;
	const day = fecha.getDate();
	return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

export const getHora = (rowData) => {
	const fecha = new Date(rowData.created_at);
	const hour = fecha.getHours();
	const minute = fecha.getMinutes();
	const second = fecha.getSeconds();
	return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second
		.toString()
		.padStart(2, "0")}`;
};

export const getTimeData = () => {
	const fecha = new Date();
	const year = fecha.getFullYear();
	const month = fecha.getMonth() + 1;
	const day = fecha.getDate();
	return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};
