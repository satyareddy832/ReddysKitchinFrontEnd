import {api} from "../../config/api"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType"


export const createOrder=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_ORDER_REQUEST})
        try{
            const {data}=await api.post("/api/order",reqData.order,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`
                }
            });
            if(data.payment_url){
                window.location.href=data.payment_url;
            }
            dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
            console.log("order created successfully ",data);
        }
        catch(error){
            console.log("error in order creation ",error);
            dispatch({type:CREATE_ORDER_FAILURE,payload:error})
        }
    }
}

export const getUsersOrders=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_USERS_ORDERS_REQUEST})
        try{
            const {data}=await api.get("/api/order/user",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            dispatch({type:GET_USERS_ORDERS_SUCCESS,payload:data})
            console.log("user orders ",data);
        }
        catch(error){
            console.log("error in getting orders is",error)
            dispatch({type:GET_USERS_ORDERS_FAILURE,payload:error})
        }
    }
}