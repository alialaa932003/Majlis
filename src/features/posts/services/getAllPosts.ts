import { customFetch } from "@/services/customFetch";
import type { Post } from "../types/post";

export function getAllPosts() {
	return customFetch<ApiResponse<Post[]>>("/api/v1/posts");
}
