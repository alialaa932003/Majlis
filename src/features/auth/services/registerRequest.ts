import { customFetch } from "@/services/customFetch";
import type {
    AuthPayload,
    JSendSuccess,
    RegisterRequest,
} from "../types/auth";

export async function registerRequest(payload: RegisterRequest) {
    const response = await customFetch<JSendSuccess<AuthPayload>>(
        "/auth/register",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );

    return response.data;
}