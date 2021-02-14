import axios from 'axios';
import { API_ENDPOINT } from '../constants/ApiEndPoint';
import { IUser } from '../interfaces/IUser';

export interface IGetUsersRequest {
    page?: number
}

export const GetUsersRequest = (params: IGetUsersRequest) => {
    return axios.get(`${API_ENDPOINT}/user`,{params})
}

export const SaveOrUpdateUserRequest = (user: IUser) => {

    const data : any = {...user};
    data.birthDay = +new Date(user.birthDay);

    return axios.post(`${API_ENDPOINT}/user`,data)
}

export const DeleteUserRequest = (user_id: string) => {
    return axios.delete(`${API_ENDPOINT}/user`,{params: {user_id}})
}
