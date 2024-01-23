import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

export const useGetFetch = (endPoint) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getFetchData = async () => {
		try {
			const token = localStorage.getItem("rt__estilosBackoffice"); // Obteniendo el token JWT del localStorage
			const headers = {
				// Authorization: `Bearer ${token}`,
				"x-token": token,
			};

			// const resp = await axios.get(`${url}${endPoint}`, { headers });
			const resp = await axios.get(`${url}${endPoint}`);

			const responseData = resp.data;

			setData(responseData);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const reloadFetchData = async () => {
		await getFetchData();
	};

	useEffect(() => {
		getFetchData();
	}, []);

	return {
		data,
		isLoading,
		reloadFetchData,
	};
};
