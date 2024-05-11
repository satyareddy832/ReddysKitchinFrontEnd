import {api} from "../../config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";

export const getAllRestaurantAction=(jwt)=>{
    return async (dispatch)=>{
        dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
        try{
            const {data}=await api.get("/api/restaurants",{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data})
            console.log("all restaurants ",data);
        }
        catch(error){
            dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error})

        }
    }
}

export const getRestaurantById=(reqData)=>{
    return async (dispatch)=>{
        console.log("hii out side")
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response=await api.get(`/api/restaurants/${reqData.restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });
            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
            console.log("id rest is",response.data);
        }
        catch(error){
            console.log("hii in error")
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error})

        }
    }
}

export const getRestaurantByUserId=(jwt)=>{
    return async (dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const {data}=await api.get(`/api/admin/restaurants/user`,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});
            console.log("all restaurants by user id ",data);
        }
        catch(error){
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error})

        }
    }
}


export const createRestaurant=(reqData)=>{
    return async (dispatch)=>{
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        
        try{
            const {data}=await api.post(`/api/admin/restaurants`,reqData.data,{
                headers:{
                    Authorization: `Bearer ${reqData.token}`
                },
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:data});
            console.log("all restaurants ",data);
        }
        catch(error){
            console.log("error while creating is ",error);
            dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error})

        }
    }
}


export const updateRestaurant=({restaurantId,restaurantData,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try{
            const response=await api.put(`/api/admin/restaurants/${restaurantId}`,restaurantData,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:response.data});
            console.log("all restaurants ",response.data);
        }
        catch(error){
            dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error})

        }
    }
}


export const deleteRestaurant=({restaurantId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try{
            const response=await api.delete(`/api/admin/restaurants/${restaurantId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:restaurantId});
            console.log("all restaurants ",response.data);
        }
        catch(error){
            dispatch({type:DELETE_RESTAURANT_FAILURE,payload:error})

        }
    }
}

export const updateRestaurantStatus=({restaurantId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});
        try{
            const response=await api.put(`/api/admin/restaurants/${restaurantId}/status`,{},{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS,payload:response.data});
            console.log("all restaurants ",response.data);
        }
        catch(error){
            dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE,payload:error})

        }
    }
}

export const createCategoryAction=({reqData,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const {data}=await api.post(`/api/admin/category`,reqData,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:CREATE_CATEGORY_SUCCESS,payload:data});
            console.log("all restaurants ",data);
        }
        catch(error){
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error})

        }
    }
}


export const getRestaurantCategory=({jwt,restaurantId})=>{
    return async (dispatch)=>{
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        try{
            const {data}=await api.get(`/api/category/restaurant/${restaurantId}`,
            {
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
            });
            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS,payload:data});
            console.log("all food types ",data);
        }
        catch(error){
            console.log("error in cat is ",error)
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE,payload:error})

        }
    }
}
