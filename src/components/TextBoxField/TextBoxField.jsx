import React from "react";
import style from "./TextBoxField.module.css";

import { InputText } from "primereact/inputtext";

export const TextBoxField = ({
	textLabel,
	value,
	name,
	type = "text",
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
	errorText = "",
}) => {
	const styles = {
		width: labelWidth,
		fontSize: "15px",
	};

	return (
		<>
			<div
				className={`${style.item__group} ${
					direction === "column" ? style.item__column : style.item__row
				}`}
			>
				{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

				<InputText
					className="p-inputtext-sm"
					value={value}
					name={name}
					type={type}
					onChange={onChange}
					autoComplete="off"
					disabled={disabled}
				/>
			</div>
			{errorText && (
				<p
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						color: "tomato",
						fontSize: "14px",
						fontWeight: "600",
					}}
				>
					{errorText}
				</p>
			)}
		</>
	);
};
