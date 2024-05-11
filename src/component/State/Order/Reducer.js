import { GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";

const initialState={
    loading:false,
    orders:[],
    error:null
};


export const orderReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_USERS_ORDERS_REQUEST:
            return {
                ...state,loading:true,error:null
            }
        case GET_USERS_ORDERS_SUCCESS:
            return{
                ...state,error:null,orders:action.payload
            }    
        case GET_USERS_ORDERS_FAILURE:
            return {...state,error:action.payload,loading:false}
        
            
        default:
            return state;    
    }
}