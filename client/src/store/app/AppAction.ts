import { Dispatch } from "react";
import { IUser } from "../../interfaces/IUser";
import { AppActionTypes, SET_USERS, SET_USER_TO_EDIT } from './AppTypes';

export const SetUsers = (newUsers: IUser[]) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: SET_USERS,
        payload: {
            data: newUsers
        }
    });
}

export const SetUserToEdit = (userToEdit: IUser | null) => async (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({
        type: SET_USER_TO_EDIT,
        payload: {
            data: userToEdit
        }
    });
}
