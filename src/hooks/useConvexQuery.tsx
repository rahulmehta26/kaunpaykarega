import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export const useConvexQuery = <TData,>(
    query: any,
    ...args: any
) => {
    const result = useQuery(query, ...args);

    const [data, setData] = useState<TData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (result === undefined) {
            setIsLoading(true);
        } else {
            try {
                setData(result as TData);
                setError(null);
            } catch (err) {
                setError(err as Error);
                toast.error((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [result]);

    return { data, isLoading, error };
};


export const useConvexMutation = <TArgs, TResult>(
    mutation: any
) => {
    const mutationFn = useMutation(mutation);

    const [data, setData] = useState<TResult | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (args: TArgs) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await mutationFn(args);
            setData(response as TResult);
            return response;
        } catch (err) {
            setError(err as Error);
            toast.error((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, mutate };
};
