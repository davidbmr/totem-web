import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

export const useDeleteFetch = (endPoint, sectionName, reloadFetchData) => {
	const [isLoadingDelete, setIsLoadingDelete] = useState(true);
	const [errorDelete, setErrorDelete] = useState(null);
	const [successDelete, setSuccessDelete] = useState(false);

	const setInitStateDelete = () => {
		setIsLoadingDelete(false);
		setErrorDelete(null);
		setSuccessDelete(false);
	};

	useEffect(() => {
		if (successDelete) {
			setInitStateDelete();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successDelete]);

	const deleteFetchData = async (id) => {
		try {
			await axios.delete(`${url}${endPoint}/${id}`);

			setSuccessDelete(true);
			setIsLoadingDelete(false);
		} catch (error) {
			console.error(error);
			setErrorDelete(error);
			setIsLoadingDelete(false);
		}
	};

	return {
		deleteFetchData,
		isLoadingDelete,
	};
};
