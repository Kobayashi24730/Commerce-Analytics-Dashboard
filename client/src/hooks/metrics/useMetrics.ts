import { useQuery } from "@tanstack/react-query";
import { getMetrics } from '@/services/servicesMetrics';

export const useMetrics = () => {
    return useQuery({queryKey: ['metrics'], queryFn: getMetrics, retry: 2, staleTime: 1000 * 60 * 5 });
};