import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import ServicioItem from "@/components/ServicioItem/ServicioItem";
import InitialServicesValue from "../InitialServices.json";
import { setdataServices } from "@/store/slices/servicesData/ServicesSlice";
import { useDispatch } from "react-redux";
import Loading from "@/components/Loading/Loading";
import { Dropdown } from "primereact/dropdown";
import { InputLabel } from "@mui/material";
import style from "./Configuration.module.css";
import { url } from "@/connections/mainApi";

const initialRegister = {
	faucetStationName: "",
	faucetStationdireccion: "",
	faucetStationArea: 0,
	services: InitialServicesValue,
	faucetStationProvincia: "",
	faucetStationDistrito: "",
	faucetStationurlMap: "",
};

const district = [
	{ name: "Lima", code: "LIMA" },
	{ name: "Chorrillos", code: "CHORRILLOS" },
	{ name: "San Isidro", code: "SAN ISIDRO" },
	{ name: "Ruta Chaclayo", code: "RUTA CHACLAYO" },
	{ name: "Ruta Chosica", code: "RUTA CHOSICA" },
	{ name: "Ruta San Isidro", code: "RUTA SAN ISIDRO" },
	{ name: "San Juan de Lurigancho", code: "SAN JUAN DE LURIGANCHO" },
];

const Configuration = () => {
	const labels = ["Activo", "Inactivo"];
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [registerData, setRegisterData] = useState(initialRegister);
	const [data, setData] = useState([]);
	const [services, setServices] = useState(null);
	const [isLoading, setisLoading] = useState(false);

	console.log(services);

	const dispatch = useDispatch();

	const fetchData = async () => {
		setisLoading(true);

		try {
			const response = await axios.get(`${url}/faucet-station/unico`);
			setData(response.data);
			setServices(response.data.servicios);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			throw new Error("Error en la petición GET en Configuracion");
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data === undefined) {
			setRegisterData(initialRegister);
		} else {
			setRegisterData(data);
		}
	}, [data]);

	const handleChange = (e) => {
		const target = e.target;
		setRegisterData({
			...registerData,
			[target.name]: target.value,
		});
	};

	const handleDistrictChange = (e) => {
		setRegisterData({
			...registerData,
			faucetStationDistrito: e.value,
		});
	};

	const handleReload = () => {
		window.location.reload();
	};

	const handleSubmit = async () => {
		if (data === undefined) {
			const {
				faucetStationArea,
				faucetStationName,
				faucetStationdireccion,
				services,
				faucetStationProvincia,
				faucetStationDistrito,
				faucetStationurlMap,
			} = registerData;

			const areaForm = Number(faucetStationArea);

			const body = {
				faucetStationArea: areaForm,
				faucetStationName,
				faucetStationdireccion,
				services,
				faucetStationProvincia,
				faucetStationDistrito: faucetStationDistrito.code,
				faucetStationurlMap,
			};

			try {
				const response = await axios.post(`${url}faucet-station/unico`, body, {
					headers: {
						"x-token": loginData,
					},
				});
				dispatch(setdataServices(response.data));
				fetchData();
			} catch (error) {
				throw new Error("Error al obtener los servicios");
			}

			//////////////////////////////////////// ELSE CONDICIONAL////////////////////////////////
		} else {
			const {
				faucetStationArea,
				faucetStationName,
				faucetStationdireccion,
				faucetStationProvincia,
				faucetStationurlMap,
			} = registerData;

			const areaForm = Number(faucetStationArea);

			// Verifica si registerData.district está definido, si no, usa el valor de data.district
			const districtCode = registerData.faucetStationDistrito.code
				? registerData.faucetStationDistrito.code
				: data.faucetStationDistrito;

			// const provinceCode = registerData.faucetStationProvincia.code
			// 	? registerData.faucetStationProvincia.code
			// 	: data.faucetStationProvincia;

			const body = {
				faucetStationArea: areaForm,
				faucetStationName,
				faucetStationdireccion,
				servicios: services,
				faucetStationProvincia,
				faucetStationDistrito: districtCode,
				faucetStationurlMap,
			};

			try {
				console.log(body);
				const response = await axios.patch(`${url}/faucet-station/unico/${data?.id}`, body);
				// dispatch(setdataServices(response.data));
				// fetchData();
				// handleReload();
			} catch (error) {
				console.log(error);
				throw new Error("Error al obtener los servicios");
			}
		}
	};

	return (
		<>
			{!!isLoading ? (
				<Loading />
			) : (
				<MainContentStructure>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<h2 className="title__sections">
							{" "}
							{data !== undefined ? "Configura tu estación" : "Registra tu estación"}{" "}
						</h2>
					</div>
					<hr />
					<div className={style.inputs_config}>
						<SectionStructure>
							<TextBoxField
								textLabel={"Nombre de la Estación"}
								name={"faucetStationName"}
								value={registerData.faucetStationName}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Dirección de la Estación"}
								name={"faucetStationdireccion"}
								value={registerData.faucetStationdireccion}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"URL Mapa"}
								name={"faucetStationurlMap"}
								value={registerData.faucetStationurlMap}
								onChange={handleChange}
							/>
						</SectionStructure>
					</div>
					<div className={style.inputs_config}>
						<SectionStructure>
							<div className={style.container__input}>
								<TextBoxField
									textLabel={"Área del Grifo"}
									name={"faucetStationArea"}
									value={registerData.faucetStationArea}
									onChange={handleChange}
								/>
								<p> m2 </p>
							</div>
						</SectionStructure>

						<SectionStructure>
							<TextBoxField
								textLabel={"Provincia"}
								name={"faucetStationProvincia"}
								value={registerData.faucetStationProvincia}
								onChange={handleChange}
							/>
						</SectionStructure>

						<SectionStructure>
							<div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
								<InputLabel> Selecciona un Distrito </InputLabel>
								<Dropdown
									value={registerData.faucetStationDistrito}
									onChange={handleDistrictChange} // Usar la función handleDistrictChange
									options={district}
									optionLabel="name"
									placeholder={
										registerData.faucetStationDistrito !== ""
											? registerData.faucetStationDistrito
											: "Selecciona un Distrito"
									}
									className="w-full md:w-14rem"
									name={"faucetStationDistrito"}
								/>
							</div>
						</SectionStructure>
					</div>

					{services && (
						<div className={style.container}>
							<ServicioItem labels={labels} services={services} setServices={setServices} />
						</div>
					)}
					<div className={style.buttonContainer}>
						<Button label="Aceptar Cambios" raised onClick={handleSubmit} />
					</div>
				</MainContentStructure>
			)}
		</>
	);
};

export default Configuration;
