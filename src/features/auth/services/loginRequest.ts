import { customFetch } from "@/services/customFetch";
import type { AuthPayload, JSendSuccess, LoginRequest } from "../types/auth";

export async function loginRequest(payload: LoginRequest) {
    const response = await customFetch<JSendSuccess<AuthPayload>>(
        "/api/auth/login",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );

    return response.data;
}