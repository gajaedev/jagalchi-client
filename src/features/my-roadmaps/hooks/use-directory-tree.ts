import { useQuery } from '@tanstack/react-query';

import { getDirectoryTree } from '@/api/roadmap';
import type { DirectoryTreeResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useDirectoryTree() {
  return useQuery<DirectoryTreeResponse>({
    queryKey: queryKeys.directories.tree(),
    queryFn: getDirectoryTree,
  });
}
