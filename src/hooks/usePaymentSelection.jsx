import { useState } from "react";
export const usePaymentSelection = () => {
	const [fuelSelection, setFuelSelection] = useState(["PREMIUM"]);
	const [paymentSelection, setPaymentSelection] = useState("TARJETA");

	const [statusTableFuels, setStatusTableFuels] = useState([
		{
			id: 1,
			mostrar: true,
			tipo_pago: "TARJETA",
			combustible: "PREMIUM",
		},
		{
			id: 2,
			mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "DIESEL",
		},
		{
			id: 3,
			mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "REGULAR",
		},
		{
			id: 4,
			mostrar: false,
			tipo_pago: "TARJETA",
			combustible: "GLP",
		},
		{
			id: 5,
			mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "GLP",
		},
		{
			id: 6,
			mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "REGULAR",
		},
		{
			id: 7,
			mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "DIESEL",
		},
		{
			id: 8,
			mostrar: false,
			tipo_pago: "YAPE/PLIN",
			combustible: "PREMIUM",
		},
		{
			id: 9,
			mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "PREMIUM",
		},
		{
			id: 10,
			mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "DIESEL",
		},
		{
			id: 11,
			mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "REGULAR",
		},
		{
			id: 12,
			mostrar: false,
			tipo_pago: "EFECTIVO",
			combustible: "GLP",
		},
	]);

	const handleChangeFuel = (selectedFuel) => {
		setFuelSelection(selectedFuel);
	};

	const handleChangePayment = (selectedPayment) => {
		setPaymentSelection(selectedPayment);
	};

	return {
		fuelSelection,
		paymentSelection,
		handleChangeFuel,
		handleChangePayment,
		statusTableFuels,
		setStatusTableFuels,
	};
};
