// Data fetching hook with Axios
import axios from "axios";
import { useEffect, useState, useRef } from "react";

export const useAxios = (getAccessToken) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const controllerRef = useRef(null);

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            if (!getAccessToken) return config;
            const token = await getAccessToken();
            if (!token) {
                // Cancel the request explicitly
                return Promise.reject(
                    new Error("No access token available")
                );
            }

            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
            (error) => Promise.reject(error)
        );

    useEffect(() => {
        return () => controllerRef.current?.abort();
    }, []);

    const fetchData = async ({ url, method, data = {}, params = {} }) => {
        setLoading(true);
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controllerRef.current.signal,
        });
        setResponse(result.data);
        setError("");
        } catch (error) {
            if (axios.isCancel(error)) {
                console.error("Request cancelled:", error.message);
            }
            setError(error.response ? error.response.data : error.message);
            setResponse(null);
        } finally {
            setLoading(false);
        }
    };
    return { response, error, loading, fetchData };
};
