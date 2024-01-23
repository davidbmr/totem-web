import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./VerificacionUsuario.module.css";

import Footer from "@/features/web/components/Footer/Footer";

export const VerificacionUsuario = () => {
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			console.log("Verificado");
		}
	}, [id]);

	return (
		<>
			<section className={style.home_main}>
				<div className={style.home_main_container}>
					<div className={style.home__main__container__shadow}></div>
					<h1 className={style.home_about_h1} style={{ textAlign: "center" }}>
						HEMOS VERIFICADO TU USUARIO
						<br />
						GRACIAS POR REGISTRARTE!
					</h1>
				</div>
			</section>
			<Footer />
		</>
	);
};
