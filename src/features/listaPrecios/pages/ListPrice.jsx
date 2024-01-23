import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { SelectField } from "@/components/SelectField/SelectField";
import style from "./ListPrice.module.css";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

import PrimeCalendar from "@/primeComponents/PrimeCalendar/PrimeCalendar";

import { Button } from "primereact/button";
import useModal from "@/hooks/useModal";

const ListPrice = () => {
	const { Modal, showModal } = useModal();
	const loginData = useSelector((state) => state.auth?.login?.token);
	const [selectedDate, setSelectedDate] = useState("");
	const [isLoadingOptions, setIsLoadingOptions] = useState(true);
	const [selectedOptions, setSelectedOptions] = useState({
		capital: null,
		country: null,
		gasoline: null,
		octane: null,
		product: null,
	});
	const [capitalsOptions, setCapitalsOptions] = useState([]);
	const [countriesOptions, setCountriesOptions] = useState([]);
	const [districtsOptions, setDistrictsOptions] = useState([]);
	const [productsOptions, setProductsOptions] = useState([]);
	const [octaneOptions, setOctaneOptions] = useState([]);
	const [prices, setPrices] = useState([]);
	const fetchOptions = async () => {
		const url = "https://e-totem-back-production.up.railway.app/api/list-prices";

		const headers = {
			"x-token": loginData,
		};

		const response = await axios.get(url, { headers });
		return response.data;
	};

	const {
		data: optionsData,
		isLoading: optionsLoading,
		error: optionsError,
	} = useQuery("options", fetchOptions);

	useEffect(() => {
		if (!optionsLoading && optionsData) {
			const distinctCapitals = [...new Set(optionsData.map((item) => item.department))];
			const distinctCountries = [...new Set(optionsData.map((item) => item.province))];
			const distinctDistricts = [...new Set(optionsData.map((item) => item.district))];
			const distinctOctane = [...new Set(optionsData.map((item) => item.establishment))];
			const distinctProduct = [...new Set(optionsData.map((item) => item.product))];

			const capitalsOptions = distinctCapitals.map((capital, index) => ({
				id: index + 1,
				value: capital,
				label: capital,
			}));

			const countriesOptions = distinctCountries.map((province, index) => ({
				id: index + 1,
				value: province,
				label: province,
			}));

			const districtsOptions = distinctDistricts.map((district, index) => ({
				id: index + 1,
				value: district,
				label: district,
			}));

			const octaneOptions = distinctOctane.map((octane, index) => ({
				id: index + 1,
				value: octane,
				label: octane,
			}));

			const productOption = distinctProduct.map((type, index) => ({
				id: index + 1,
				value: type,
				label: type,
			}));

			// Configuramos los estados con las nuevas opciones
			setCapitalsOptions([
				{ id: 0, value: "", label: "Seleccione una Opción" },
				...capitalsOptions,
			]);
			setCountriesOptions([
				{ id: 0, value: "", label: "Seleccione una Opción" },
				...countriesOptions,
			]);
			setDistrictsOptions([
				{ id: 0, value: "", label: "Seleccione una Opción" },
				...districtsOptions,
			]);
			setOctaneOptions([{ id: 0, value: "", label: "Seleccione una Opción" }, ...octaneOptions]);
			setProductsOptions([{ id: 0, value: "", label: "Seleccione una Opción" }, ...productOption]);

			setIsLoadingOptions(false);
		}
	}, [optionsData, optionsLoading]);

	const fetchData = async () => {
		const url = "https://e-totem-back-production.up.railway.app/api/list-prices";

		const headers = {
			"x-token": loginData,
		};

		const formattedDate = selectedDate ? formatDate(selectedDate) : null;

		const queryParams = {
			created_at: formattedDate,
			department: selectedOptions.capital || undefined,
			province: selectedOptions.country || undefined,
			district: selectedOptions.gasoline || undefined,
			establishment: selectedOptions.octane || undefined,
			product: selectedOptions.product || undefined,
		};

		try {
			const response = await axios.get(url, { headers, params: queryParams });
			setPrices(response.data);
		} catch (error) {
		} finally {
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const handleButtonClick = () => {
		fetchData();
	};

	const handleDateChange = (event) => {
		try {
			const selectedValue = event.target.value;
			setSelectedDate(selectedValue);
		} catch (error) {
			throw new Error(error);
		}
	};

	const getFecha = (rowData) => {
		const fecha = new Date(rowData.created_at);
		const year = fecha.getFullYear();
		const month = fecha.getMonth() + 1;
		const day = fecha.getDate();
		return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
	};

	const getGasolina = (rowData) => {
		if (rowData?.product === "Gasohol Regular") {
			return "Gasolina Regular";
		} else {
			return "Gasolina Premium";
		}
	};

	const columns = [
		{ nombre: "Departamento", campo: "department" },
		{ nombre: "Distrito", campo: "district" },
		{ nombre: "Establecimiento", campo: "establishment" },
		{ nombre: "Direccion", campo: "address" },
		{ nombre: "Fecha creacion", campo: getFecha },
		{ nombre: "Tipo Combustible ", campo: "product" },
		{ nombre: "Precio de Venta ", campo: "sell_price" },
	];

	const handleOptionChange = (event) => {
		try {
			const { name, value } = event.target;
			setSelectedOptions((prevOptions) => ({
				...prevOptions,
				[name]: value,
			}));
		} catch (error) {
			console.error("Error al seleccionar la opción:", error);
		}
	};

	// if (optionsLoading) {
	//   return <Loading />;
	// }

	if (optionsError) {
		return <div>Error fetching options data: {optionsError.message}</div>;
	}

	const handleResetFilters = () => {
		setSelectedDate("");
		setSelectedOptions({
			capital: null,
			country: null,
			gasoline: null,
			octane: null,
		});
		setPrices([]);
		// Aquí también puedes restablecer los otros filtros, si los tienes
	};

	return (
		<>
			<MainContentStructure>
				<h2>Precios de mercado</h2>
				<hr />
				<div className={style.date_contain}>
					<SectionStructure>
						<div className={style.calendar__reset}>
							<PrimeCalendar
								value={selectedDate}
								onChange={handleDateChange}
								textLabel="Seleccione una fecha"
							/>

							<Button
								className={style.btn__reset}
								label="Restablecer filtros"
								icon="pi pi-refresh"
								onClick={handleResetFilters}
							/>
							<Button
								className={style.btn__reset}
								label="Aceptar"
								icon="pi pi-check"
								onClick={handleButtonClick}
							/>
						</div>
					</SectionStructure>
				</div>
				<SectionStructure>
					<div className={style.select_contain}>
						<SelectField
							textDefault={false}
							textLabel={"Departamento"}
							value={selectedOptions.capital}
							name={"capital"}
							onChange={handleOptionChange}
							options={capitalsOptions}
							valueOption={"value"}
							textOption={"label"}
						/>

						<SelectField
							textDefault={false}
							textLabel={"Provincia"}
							value={selectedOptions.country}
							name={"country"}
							onChange={handleOptionChange}
							options={countriesOptions}
							valueOption={"value"}
							textOption={"label"}
						/>

						<SelectField
							textDefault={false}
							textLabel={"Distrito"}
							value={selectedOptions.gasoline}
							name={"gasoline"}
							onChange={handleOptionChange}
							options={districtsOptions}
							valueOption={"value"}
							textOption={"label"}
						/>

						<SelectField
							textDefault={false}
							textLabel={"Establecimiento"}
							value={selectedOptions.octane}
							name={"octane"}
							onChange={handleOptionChange}
							options={octaneOptions}
							valueOption={"value"}
							textOption={"label"}
						/>

						<SelectField
							textDefault={false}
							textLabel={"Tipo Gasolina"}
							value={selectedOptions.product}
							name={"product"}
							onChange={handleOptionChange}
							options={productsOptions}
							valueOption={"value"}
							textOption={"label"}
						/>
					</div>
				</SectionStructure>

				<DataTable columns={columns} data={prices} buttonExcel={false} />

				<Modal width={"550px"} height={"350px"} title={"Crear"}></Modal>
			</MainContentStructure>
		</>
	);
};

export default ListPrice;
