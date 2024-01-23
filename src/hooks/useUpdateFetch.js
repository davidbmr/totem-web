import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";

export const useUpdateFetch = (endPoint, sectionName, reloadFetchData, addModal) => {
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [errorUpdate, setErrorUpdate] = useState(null);
	const [successUpdate, setSuccessUpdate] = useState(false);

	const setInitStateUpdate = () => {
		setIsLoadingUpdate(false);
		setErrorUpdate(null);
		setSuccessUpdate(false);
	};

	useEffect(() => {
		if (successUpdate) {
			if (addModal) {
				addModal.hideModal();
			}
			setInitStateUpdate();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successUpdate]);

	const updateFetchData = async (id, data) => {
		try {
			setIsLoadingUpdate(true);

			await axios.patch(`${url}${endPoint}/${id}`, data);

			setIsLoadingUpdate(false);
			setSuccessUpdate(true);
		} catch (error) {
			setIsLoadingUpdate(false);
			setErrorUpdate(error);
		}
	};

	return {
		updateFetchData,
		isLoadingUpdate,
	};
};
