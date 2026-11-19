import { queryOptions } from "@tanstack/react-query";
import { getMemberRatings } from "../api/members";

export const ratingQueries = {
  member: (memberId: number, page = 0, size = 10) =>
    queryOptions({
      queryKey: ["ratings", "member", memberId, page, size],
      queryFn: () => getMemberRatings(memberId, page, size),
      enabled: memberId > 0,
    }),

  myMovie: (memberId: number, movieId: number) =>
    queryOptions({
      queryKey: ["ratings", "my-movie", memberId, movieId],

      queryFn: async () => {
        let page = 0;

        while (true) {
          const response = await getMemberRatings(
            memberId,
            page,
            100,
          );

          const rating = response.content.find(
            (item) => item.movieId === movieId,
          );

          if (rating) return rating;

          page += 1;

          if (page >= response.totalPages) {
            return null;
          }
        }
      },

      enabled: memberId > 0 && movieId > 0,
    }),
};