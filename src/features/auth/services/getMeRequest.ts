import { customFetch } from "@/services/customFetch";
import type { JSendSuccess, MePayload } from "../types/auth";

export async function getMeRequest() {
    const response = await customFetch<JSendSuccess<MePayload>>("/auth/me");

    return response.data;
}