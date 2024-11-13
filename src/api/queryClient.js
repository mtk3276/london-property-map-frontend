import { QueryClient } from "react-query";

// Create a React Query client instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: 2, // Retry failed requests twice
        },
    },
});

export default queryClient;
