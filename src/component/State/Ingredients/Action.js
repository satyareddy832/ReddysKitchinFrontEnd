import {api} from "../../config/api";
import { CREATE_INGREDIENTS_CATEGORY_SUCCESS, CREATE_INGREDIENTS_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_SUCCESS,UPDATE_STOKE } from "./ActionType";


export const getIngredientsOfRestaurant=({id,jwt})=>{
    return async (dispatch)=>{
        try{
            const response=await api.get(
                `/api/admin/ingredients/restaurant/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            dispatch({type:GET_INGREDIENTS,payload:response.data})
            console.log("ingrediants are ",response.data);
        }
        catch(error){

        }
    }
}


export const createIngredientCategory=({data,jwt})=>{
    return async (dispatch)=>{
        try{
            const response=await api.post(
                `/api/admin/ingredients/category`,data,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            dispatch({type:CREATE_INGREDIENTS_CATEGORY_SUCCESS,payload:response.data})
            console.log("cat ing is created is ",response.data)
        }
        catch(error){
            console.log("error in create ing Cat ",error);

        }
    }
}

export const createIngredient=({data,jwt})=>{
    return async (dispatch)=>{
        try{
            const response=await api.post(
                `/api/admin/ingredients`,data,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            dispatch({type:CREATE_INGREDIENTS_SUCCESS,payload:response.data})
            console.log("ing created ",response.data);
        }
        catch(error){
            console.log("error in ing creating ",error);

        }
    }
}

export const getIngredientCategory =({id,jwt})=>{
    return async (dispatch)=>{
        try{
            const response=await api.get(
            `/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS,payload:response.data})
            console.log("ing cat is ",response.data)
        }
        catch(error){
            console.log("error in get ing cat",error)
        }
    }
}

export const updateStokeOfIngredient =({id,jwt})=>{
    console.log("iddd",id);
    return async (dispatch)=>{
        try{
            const response=await api.put(
            `/api/admin/ingredients/${id}/stoke`,{},
                {
                    headers:{
                        Authorization:`Bearer ${jwt}`,
                    }
                }
            )
            dispatch({type:UPDATE_STOKE,payload:response.data})
        }
        catch(error){

        }
    }
}


