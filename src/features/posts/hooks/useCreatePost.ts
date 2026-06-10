import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/createPost";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.posts.all(),
			});
		},
	});
}
