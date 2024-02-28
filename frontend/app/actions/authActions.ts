import axios from 'axios';
import { setLoading, setIsAuthenticated } from '../reducers/authReducer';
import useBase from '../hooks/useBase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const baseUrl = useBase;

export const loginUser = (d: Object) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const { data } = await axios.post("http://localhost:3002/auth/login", d);
        if (data.success) {
            localStorage.setItem("token", data.token);
        }

        dispatch(setIsAuthenticated(true));
        dispatch(setLoading(false));
    } catch (e) {
        toast.error((e as any).response.data.message);
        dispatch(setLoading(false));
    }
};

export const registerUser = (d: Object) => {
    async (dispatch: any) => {
        try {
            dispatch(setLoading(false));
            const { data } = await axios.post("http://localhost:3002/auth/register", d);

            if (data.success) {
                toast.success("Successful Registration");
            }
            dispatch(setLoading(false));
        }
        catch (e: any) {
            toast.error((e as any).response.data.message);
            dispatch(setLoading(false));
        }
    }
}