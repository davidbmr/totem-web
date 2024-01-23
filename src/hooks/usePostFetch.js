import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/connections/mainApi.js";
import { useNavigate } from "react-router-dom";

export const usePostFetch = (endPoint, sectionName, reloadFetchData, addModal) => {
	const navigate = useNavigate();

	const [isLoadingPost, setIsLoadingPost] = useState(false);
	const [errorPost, setErrorPost] = useState(null);
	const [successPost, setSuccessPost] = useState(false);

	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (successPost) {
			if (addModal) {
				addModal.hideModal();
			}
			setInitStatePost();
			if (reloadFetchData) {
				reloadFetchData();
			}
		}
	}, [successPost]);

	const postFetchData = async (data, query, pathUrl) => {
		try {
			setIsLoadingPost(true);

			const resp = await axios.post(`${url}${endPoint}${query ? `?${query}` : ""}`, data);

			setIsLoadingPost(false);
			setSuccessPost(true);

			if (pathUrl) {
				setTimeout(() => {
					navigate(pathUrl);
				}, 500);
			}

			return resp.data.data;
		} catch (error) {
			setIsLoadingPost(false);
			setErrorPost(error);
		}
	};

	return {
		postFetchData,
		isLoadingPost,
		errorPost,
	};
};
