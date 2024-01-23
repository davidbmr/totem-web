import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	etapa: 1,
	rechazado: false,
	dni: "",
	cod_compra: "",
	placa: "",
	detalleTransaccion: {},
};

export const islaSlice = createSlice({
	name: "isla",
	initialState,
	reducers: {
		resetState: (state) => {
			state.etapa = 1;
			state.rechazado = false;
			state.dni = "";
			state.placa = "";
			state.detalleTransaccion = {};
		},
		addEtapa: (state) => {
			state.etapa++;
		},
		setDateValidate: (state, action) => {
			state.cod_compra = action.payload.codigo;
			state.placa = action.payload.placa;
		},
		clearDateValdiate: (state) => {
			state.cod_compra = "";
			state.placa = "";
		},
		declineEtapa: (state) => {
			state.rechazado = true;
		},
		setDetalleTransaccion: (state, action) => {
			state.detalleTransaccion = action.payload;
		},
		clearDetalleTransaccion: (state) => {
			state.detalleTransaccion = {};
		},
	},
});

export const {
	resetState,
	addEtapa,
	declineEtapa,
	setDetalleTransaccion,
	clearDetalleTransaccion,
	setDateValidate,
	clearDateValidate,
} = islaSlice.actions;
