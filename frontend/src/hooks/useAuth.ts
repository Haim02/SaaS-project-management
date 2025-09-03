import { useIsUserLoginQuery } from "../services/authApi";

export const useAuth = () => {
    const { data, isLoading, isError } = useIsUserLoginQuery();
    return {
        user: data ?? null,
        isAuthenticated: !!data,
        isLoading,
        isError,
    };
}
