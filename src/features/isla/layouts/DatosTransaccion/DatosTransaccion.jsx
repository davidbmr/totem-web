import React from "react";
import style from "./DatosTransaccion.module.css";

import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const DatosTransaccion = ({ nextStep }) => {
	const { detalleTransaccion } = useSelector((state) => state.isla);

	return (
		<div className={style.login__container}>
			<h2 className={style.login__title}>Datos de la transacción</h2>

			<div className={style.placa__container}>
				<p className={style.placa__label}>Código compra:</p>
				<div className={style.placa__code}>
					<p className={style.placa__code__text}>{detalleTransaccion?.codigo}</p>
				</div>
			</div>

			{/* Datos de la factura */}
			<div className={style.datos__container}>
				<div className={style.datos__item}>
					<p className={style.datos__item__label}>Tipo de comprobante:</p>
					<p className={style.datos__item__text}>{detalleTransaccion?.tipoComprobante}</p>
				</div>
				<div className={style.datos__item}>
					<p className={style.datos__item__label}>RUC / DNI:</p>
					<p className={style.datos__item__text}>
						{detalleTransaccion?.tipoDocumento?.dni || detalleTransaccion?.tipoDocumento?.ruc}
					</p>
				</div>
				<div className={style.datos__item}>
					<p className={style.datos__item__label}>Razón social / Nombre:</p>
					<p className={style.datos__item__text}>
						{detalleTransaccion?.nombre?.nombre || detalleTransaccion?.nombre?.razonSocial}
					</p>
				</div>
				<div className={style.datos__item}>
					<p className={style.datos__item__label}>Combustible:</p>
					<p className={style.datos__item__text}>{detalleTransaccion?.combustible}</p>
				</div>
				<div className={style.datos__item}>
					<p className={style.datos__item__label}>GL a despachar:</p>
					<p className={style.datos__item__text}>{detalleTransaccion?.glDespachar}</p>
				</div>
			</div>

			<Button label="Siguiente" onClick={nextStep} />
		</div>
	);
};

export default React.memo(DatosTransaccion);
