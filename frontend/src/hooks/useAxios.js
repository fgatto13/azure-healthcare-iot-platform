// Data fetching hook with Axios
import axios from "axios"
import { useEffect, useState } from "react"

export const useAxios = () => {
    const [response, setResponse] = useState(null)  // represents our response, default value is null
    const [error, setError] = useState("")          // represents any error msgs, default ""
    const [loading, setLoading] = useState(false)   // represents the request status, def false

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    })

    // we can also add interceptors to do smth before or after the req/resp
    axiosInstance.interceptors.request.use(
    (config)=>{
        return config;
    },
    (error) => {
        return Promise.reject(error);
    })

    axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error) => {
        return Promise.reject(error);
    })

    // if the component that is using the Axios call unmounts, we should also abort the axios call
    let controller = new AbortController()
    // to check when the component unmounts, we use the useEffect hook to create a cleanup funct
    // the useEffect hook will be run on the caller component
    useEffect(() =>{
        return () => controller?.abort()    // we first want to check that the controller is not null
    }, [])

    const fetchData = async({url, method, data={}, params = {}}) => {
        setLoading(true)    // the request has been initiated

        controller.abort()
        controller = new AbortController()  // this will create a new abort controller for our req
        try{
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controller.signal
            });
            // if the request is successful, set the response as the received data
            setResponse(result.data)    
            setError("")
        } catch(error) {
            if(axios.isCancel(error)){
                console.error("Request cancelled: ", error.message)
            }
            setError(error.response ? error.response.data: error.message)
            setResponse(null)
        } finally {
            // so that we always conclude the loading
            setLoading(false)
        }
    };
    return {
        response,
        error,
        loading,
        fetchData
    }
};