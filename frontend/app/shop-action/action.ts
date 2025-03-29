// shop-action/action.ts
'use server';

interface ProductData {
    _id: string;
    name: string;
    price: number;
    trending: boolean;
    ratings: number;
    images: {
        public_id: string;
        url: string;
    }[]
}

const ITEMS_PER_PAGE = 12;

export async function getAllProducts(type: string, page: number = 1): Promise<{ data: ProductData[], error: string | null, loading: boolean }> {
    const url = 'http://localhost:3002'
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: ITEMS_PER_PAGE.toString(),
            type: type.length>0?type:""
        });

        const response = await fetch(`${url}/product/get-all?${params}`, {
            method: "GET",
        });


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();

        if (res.status === 'error') {
            return { data: [], error: res.message, loading: false };
        }

        return { data: res.data, error: null, loading: false };
    } catch (error: any) {
        console.error("Failed to fetch products:", error);
        return { data: [], error: "Server Error", loading: false };
    }
}

export async function getTotalProductsCount() {
    try {
        const url = 'http://localhost:3002'

        const response = await fetch(`${url}/product/count`, {
            method: "GET",
            cache: 'force-cache', // Or 'no-store' if you want to revalidate on every request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();

        if (res.status === 'error') {
            return { count: 0, error: res.message };
        }

        return { count: res.count, error: null };
    } catch (error: any) {
        console.error("Failed to fetch products count:", error);
        return { count: 0, error: "Server Error" };
    }
}
