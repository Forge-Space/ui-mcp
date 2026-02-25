export const tanstackQueryPattern = {
  id: 'tanstack-query',
  name: 'TanStack Query Hook Pattern',
  code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ENTITY_KEYS = {
  all: ['entities'] as const,
  lists: () => [...ENTITY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...ENTITY_KEYS.lists(), filters] as const,
  details: () => [...ENTITY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ENTITY_KEYS.details(), id] as const,
};

export function useEntities(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: filters ? ENTITY_KEYS.list(filters) : ENTITY_KEYS.lists(),
    queryFn: async () => {
      const params = filters ? '?' + new URLSearchParams(filters as Record<string, string>).toString() : '';
      const res = await fetch('/api/entities' + params);
      if (!res.ok) throw new Error('Failed to fetch entities');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useEntity(id: string) {
  return useQuery({
    queryKey: ENTITY_KEYS.detail(id),
    queryFn: async () => {
      const res = await fetch('/api/entities/' + id);
      if (!res.ok) throw new Error('Entity not found');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateEntity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch('/api/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENTITY_KEYS.all });
    },
  });
}`,
};
