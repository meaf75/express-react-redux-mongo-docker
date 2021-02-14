import { IUser } from "../../interfaces/IUser";
import { AddElementActionType } from "../StoreTypes";

export interface AppState {    
    users: IUser[];
    userToEdit: IUser | null;
}

export const SET_USERS = 'SET_USERS';
export const SET_USER_TO_EDIT = 'SET_USER_TO_EDIT';

export type AppActionTypes =
    AddElementActionType<typeof SET_USERS, IUser[]> |
    AddElementActionType<typeof SET_USER_TO_EDIT, IUser | null> 