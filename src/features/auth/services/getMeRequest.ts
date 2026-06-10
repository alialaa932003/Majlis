import { customFetch } from "@/services/customFetch";
import type { JSendSuccess, MePayload } from "../types/auth";

export async function getMeRequest() {
    const response = await customFetch<JSendSuccess<MePayload>>("/api/auth/me");

    return response.data;
}