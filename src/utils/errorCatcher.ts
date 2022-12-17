import { AxiosError } from "axios";
import { toast } from "react-toastify";

function errorCatcher(e: unknown) {
    const error = e as AxiosError;
    const isServerError = error.response && error.response.status >= 500;
    if (isServerError) {
        console.log("Ошибка сервера", error);
        toast.error(error.message);
    }
}

export default errorCatcher;
