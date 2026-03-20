import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { fetchMessages, createMessage, Message } from '@/lib/api';

export const useMessages = (params?: { limit?: number }) => {
  return useInfiniteQuery({
    queryKey: ['messages', params],
    queryFn: async ({ pageParam }) => {
      const rawData = await fetchMessages({ limit: params?.limit || 50, before: pageParam as string | undefined });

      return [...rawData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    getNextPageParam: (lastPage: Message[]) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].createdAt;
    },
    initialPageParam: undefined as string | undefined,
    refetchInterval: 1000,
    staleTime: 0,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessage,
    onMutate: async (newMessagePayload) => {
      await queryClient.cancelQueries({ queryKey: ['messages'] });

      const optimisticMessage: Message = {
        _id: Math.random().toString(),
        message: newMessagePayload.message,
        author: newMessagePayload.author,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueriesData({ queryKey: ['messages'] }, (old: InfiniteData<Message[]> | undefined) => {
        if (!old || !old.pages) return { pages: [[optimisticMessage]], pageParams: [undefined] };
        const newPages = [...old.pages];
        newPages[0] = [optimisticMessage, ...newPages[0]];
        return {
          ...old,
          pages: newPages,
        };
      });

      return {};
    },
    onError: () => { },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
