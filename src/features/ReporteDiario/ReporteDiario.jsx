import { useState, useEffect } from "react";
import style from "./ReporteDiario.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { IntencionesCompra } from "./components/IntencionesCompra/IntencionesCompra";
import { Ventas } from "./components/Ventas/Ventas";
import { usePostFetch } from "@/hooks/usePostFetch";
import { getTimeData } from "../../helpers/getTime";
import { url } from "@/connections/mainApi";
import axios from "axios";
import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { getHora, getTime } from "@/helpers/getTime";

function ReporteDiario() {
	const [reporteData, setReporteData] = useState({});

	console.log(reporteData);

	// const reporteDiarioFetch = usePostFetch(
	// 	"/transaccion/back-office/reporte-diario",
	// 	"Reporte diario"
	// );

	useEffect(() => {
		const time = getTimeData();

		axios
			.post(`${url}/transaccion/back-office/reporte-diario`, {
				fechaInicio: time,
				fechaFin: time,
			})
			.then((resp) => resp.data)
			.then((data) => setReporteData(data));
	}, []);

	const [selectedDates, setSelectedDates] = useState({
		fechaInicio: null,
		fechaFin: null,
	});

	const handleClick = async () => {
		try {
			const response = await axios.post(
				`${url}/transaccion/back-office/reporte-diario`,
				selectedDates
			);
			setReporteData(response.data);
		} catch (error) {
			console.error("Error al obtener los datos:", error);
		}
	};

	const handleDateChange = (name, value) => {
		setSelectedDates((prevDates) => ({
			...prevDates,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (selectedDates.fechaInicio && selectedDates.fechaFin) {
			handleClick();
		}
	}, [selectedDates.fechaInicio, selectedDates.fechaFin]);

	return (
		<>
			<MainContentStructure>
				<h2 className="title__sections">Reporte Diario</h2>
				<hr />

				<SectionStructure>
					<div className={style.calendar_container}>
						<PrimeCalendar
							width="45%"
							value={selectedDates.fechaInicio}
							onChange={(e) => handleDateChange("fechaInicio", e.value)}
							textLabel="Fecha inicio"
						/>

						<PrimeCalendar
							width="45%"
							value={selectedDates.fechaFin}
							onChange={(e) => handleDateChange("fechaFin", e.value)}
							textLabel="Fecha final"
						/>
					</div>
				</SectionStructure>

				<IntencionesCompra data={reporteData.intencionesCompra} />
				<br />
				<Ventas data={reporteData.ventas} />
			</MainContentStructure>
		</>
	);
}

export default ReporteDiario;
