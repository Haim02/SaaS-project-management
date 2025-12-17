import { useMeQuery } from "../services/authApi";

export const useAuth = () => {
    const { data, isLoading, isError } = useMeQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        pollingInterval: 0,
    });
    return {
        user: data ?? null,
        isAuthenticated: !!data,
        isLoading,
        isError,
    };
}
