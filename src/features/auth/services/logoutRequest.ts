import { customFetch } from "@/services/customFetch";
import type { JSendSuccess } from "../types/auth";

export async function logoutRequest() {
    const response = await customFetch<JSendSuccess<{ message: string }>>(
        "/auth/logout",
        {
            method: "POST",
        },
    );

    return response.data;
}