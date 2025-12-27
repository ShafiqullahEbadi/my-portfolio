
const useGetCompanies = () => {
    const { data, isLoading, error } = useGetCompanies();
    return { companies: data, loading: isLoading, error };
};