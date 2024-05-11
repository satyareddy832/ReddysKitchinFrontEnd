import {api} from "../../config/api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";


export const createMenuItem=({menu,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST})
        try{
            const {data}=await api.post("api/admin/food",menu,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data})
            console.log("created Menu Item is ",data);
        }
        catch(error){
            console.log("error while creating menu item ",error);
            dispatch({type:CREATE_MENU_ITEM_FAILURE,payload:error});
        }
    }
};

export const getMenuItemsByRestaurantId=(reqData)=>{
    return async (dispatch)=>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST})
        try{
            if(reqData.vegetarian===undefined){
                reqData.vegetarian=false
            }
            if(reqData.seasonal===undefined){
                reqData.seasonal=false
            }
            if(reqData.nonveg===undefined){
                reqData.nonveg=false
            }
            if(reqData.foodCategory===undefined){
                reqData.foodCategory=""
            }
            const {data}=await api.get(
            `api/food/restaurant/${reqData.restaurantId}?veg=${reqData.vegetarian}&seasonal=${reqData.seasonal}&nonveg=${reqData.nonveg}&food_category=${reqData.foodCategory}`,
            {
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,payload:data})
            console.log("menu data is ",data)
        }
        catch(error){
            console.log("error in getting menu items",error)
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,payload:error})
        }
    }
};
 
export const searchMenuItem=({keyword,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST})
        try{
            const {data}=await api.get(`api/food/search?keyword=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload:data})
        }
        catch(error){
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error})
        }
    }
};

export const updateMenuItemsAvailability=({foodId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})
        try{
            const {data}=await api.put(
                `api/admin/food/${foodId}`,
                {},
                {
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
                }
            );
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data})
            console.log("food Avalibility is updated",data);
        }
        catch(error){
            console.log("error in updating food item avalibility ",error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error})
        }
    }
};

export const deleteFoodAction=({foodId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_MENU_ITEM_REQUEST})
        try{
            const {data}=await api.delete(
                `api/admin/food/${foodId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:DELETE_MENU_ITEM_SUCCESS,payload:data})
            console.log("deleted food successfully",data);
        }
        catch(error){
            console.log("error while deleting",error);
            dispatch({type:DELETE_MENU_ITEM_FAILURE,payload:error});
        }
    }
};
