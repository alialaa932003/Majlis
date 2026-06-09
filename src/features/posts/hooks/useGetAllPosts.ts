import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/getAllPosts";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useGetAllPosts() {
	return useQuery({
		queryKey: QUERY_KEYS.posts.all(),
		queryFn: getAllPosts,
	});
}