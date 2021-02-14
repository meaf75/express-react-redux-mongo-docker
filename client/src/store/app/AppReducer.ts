import { AppState, AppActionTypes, SET_USERS, SET_USER_TO_EDIT } from './AppTypes';

export const appInitialState: AppState = {    
    users: [],
    userToEdit: null
}

export const appReducer = (state: AppState = appInitialState, action: AppActionTypes): AppState => {
    const currentState = { ...state };
    
    switch (action.type) {
        case SET_USERS: {
            currentState.users = action.payload.data;
            break;
        }
        case SET_USER_TO_EDIT: {
            currentState.userToEdit = action.payload.data;
            break;
        }
        default:
            return currentState;
    }
    return currentState;
}