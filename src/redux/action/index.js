import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addCart = (product) => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({
                type: "ADDITEM",
                payload: product
            });
        }
        // else {
        //     setTimeout(() => {
        //         toast.error("Please login to add items to cart");
        //     }, 500)

        // }
    };
}

export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

export const clearCart = () => {
    return {
        type: "CLEARCART"
    }
}
