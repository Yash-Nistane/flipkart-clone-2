import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {

    return async dispatch => {
        
        const res = await axios.get(`/products/${slug}`);
        console.log(res);

        if(res.status === 200){

            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload:res.data
            })
            
        }
        else{
            
        }
    }
}


export const getProductByName = (payload) => {

    return async dispatch => {
        
        const res = await axios.post(`/products/searchProduct`,payload);
        console.log(res);

        if(res.status === 200){

            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload:res.data
            })

            dispatch({
                type: productConstants.SET_SEARCH_CATEGORY,
                payload: res.data
            })

            console.log(res.data.category);
        }
        else{
            
        }
    }
}




export const getProductByCatSlug = (payload) => {

   return async dispatch => {
    const res = await axios.post('/product/search',payload);
    console.log(res);
    if(res.status == 200 ){

        dispatch({
            type: productConstants.SET_SEARCH_CATEGORY,
            payload: res.data
        })
    }
   }
}


export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(payload);

             dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
             if (res.status === 200) {
                 const { page } = res.data;
                 dispatch({
                     type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                     payload: { page }
                 });
             } else {
                 const { error } = res.data;
                 dispatch({
                     type: productConstants.GET_PRODUCT_PAGE_FALIURE,
                     payload: { error }
                 });
             }
        } catch(error) {
            console.log(error)
        }

    }
}


export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            const res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: "res.data.error" }
            });
        }

    }
}

export const addReview = (payload) => {

    return async dispatch =>{

        try {
            const res = await axios.post('/product/addReview',payload);
            if(res.status == 400)
            {
                console.log(res.error);
            }

            if(res.status == 200)
            {
                console.log("review added succesfully");
            }
        } catch (error) {
            
        }
    }

}