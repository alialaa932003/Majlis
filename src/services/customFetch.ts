import { t } from "i18next";
import { BACKEND_BASE_URL } from "@/constants/backendAPIsConfig";
import { DEFAULT_LOCALE } from "@/constants/i18nConfig";
import { clearStoredToken, getStoredToken } from "@/features/auth/utils/authStorage";

export async function customFetch<T>(
    endpoint: string,
    options: RequestInit = {},
    isJsonResponse = true,
): Promise<T> {
    const isFormData = options.body instanceof FormData;
    const token = getStoredToken();

    const headers: HeadersInit = {
        ...(isFormData
            ? {
                Accept: "application/json",
            }
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
        "accept-language": localStorage.getItem("i18nextLng") || DEFAULT_LOCALE,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
        ...options,
        method: options.method || "GET",
        headers,
    });

    if (!response.ok) {
        interface CustomErrorBody {
            message?: string;
            data?: unknown;
        }

        let errorBody: CustomErrorBody;

        try {
            errorBody = await response.json();
        } catch {
            errorBody = {};
        }

        if (response.status === 401) {
            clearStoredToken();
        }

        throw {
            message: errorBody.message || t("common:error.default"),
            errorBody: errorBody.data || null,
            status: response.status,
        };
    }

    if (!isJsonResponse) {
        return response as unknown as T;
    }

    return response.json();
}