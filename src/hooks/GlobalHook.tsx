import axios from "axios";
import { useMutation } from "react-query";

export interface UseGlobalResponse<T> {
    loading: boolean;
    error: any;
    response: T | any;
    globalDataFunc: () => Promise<void>;
    isAlert?: boolean;
}

export function useGlobalRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: T,
    configType: "DEFAULT" | "IMAGE" = "DEFAULT",
    isAlert = false
): UseGlobalResponse<T> {
    const mutation = useMutation({
        mutationFn: async () => {
            try {
                const config =
                    configType === "DEFAULT" ? await getConfig() : await getConfigImg();
                let res;
                switch (method) {
                    case "GET":
                        res = await axios.get(url, config || {});
                        break;
                    case "POST":
                        res = await axios.post(url, data || {}, config || {});
                        break;
                    case "PUT":
                        res = await axios.put(url, data || {}, config || {});
                        break;
                    case "DELETE":
                        res = await axios.delete(url, config || {});
                        break;
                    default:
                        throw new Error("Invalid method");
                }
                if (res.data.error) {
                    throw new Error(res.data.error.message);
                }
                return res.data.data;
            } catch (error: any) {
                console.error("Request failed:", error);
                if (error?.message) throw error?.message;
            }
        },
    });

    return {
        loading: mutation.isLoading,
        error: mutation.error ? mutation.error : undefined,
        response: mutation.data,
        globalDataFunc: mutation.mutateAsync,
    };
}

export const getConfig = async () => {
    try {
        const token = await sessionStorage.getItem("token");
        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
export const getConfigImg = async () => {
    try {
        const token = await sessionStorage.getItem("token");
        if (token) {
            return {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};