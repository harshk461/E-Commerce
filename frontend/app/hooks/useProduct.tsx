import { useState, useEffect } from 'react';
import axios from 'axios';
import useBase from './useBase';


interface Product {
    id: string;
    name: string;
    // Add other properties as needed
}

interface HookResult {
    data: Product[];
    loading: boolean;
    error: Error | null;
}

const useCategoryData = (category: string): HookResult => {
    const url = useBase() + '/products/get';
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get<Product[]>(`${url}/${category}`);
                setData(response.data);
            } catch (error) {
                setError(error as Error | null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    return { data, loading, error };
};

export default useCategoryData;
