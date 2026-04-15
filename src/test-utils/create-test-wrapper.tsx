import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

type InitialAtomValues = Parameters<typeof useHydrateAtoms>[0];

/** 테스트용 QueryClient — retry 비활성화, 즉시 GC */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: InitialAtomValues;
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues);
  return children;
}

/** 테스트용 Provider Wrapper 생성 (QueryClient + Jotai) */
export function createTestWrapper(initialAtomValues?: InitialAtomValues) {
  const queryClient = createTestQueryClient();

  return function TestWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider>
          {initialAtomValues ? (
            <HydrateAtoms initialValues={initialAtomValues}>{children}</HydrateAtoms>
          ) : (
            children
          )}
        </Provider>
      </QueryClientProvider>
    );
  };
}
