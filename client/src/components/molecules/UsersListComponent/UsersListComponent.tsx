import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../interfaces/IUser";
import { DeleteUserRequest, GetUsersRequest, IGetUsersRequest } from "../../../services/users.service";
import { RootState } from "../../../store";
import { SetUsers, SetUserToEdit } from "../../../store/app/AppAction";
import { ApiAxiosErrorResponse } from "../../../Types/ApiAxiosErrorResponse";
import { GetFormatedDate } from "../../../utils/GetFormatedDate";
import { handle } from "../../../utils/PromiseHandler";
import { UserActionbuttons } from "../../Atoms/UserActionbuttons";
import { UsersListHeaderElement } from "../../Atoms/UsersListHeaderElement";
import { ContentWithHeader } from "../ContentWithHeader/ContentWithHeader";
import Paginator from "../Paginator";
import "./UsersListComponent.css";

export interface IUsersListComponentProps {
    style?: React.CSSProperties;
}

export const UsersListComponent = (props: IUsersListComponentProps) => {

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.app.users);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [usersToDisplay, setUsersToDisplay] = useState<IUser[]>([]);

    //#region Filters states
    const [nameFilter, setNameFilter] = useState('');
    const [userIdFilter, setUserIdFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [birthDayFilter, setBirthDayFilter] = useState('');
    const [sortSelected, setSortSelected] = useState<keyof IUser | ''>('');
    const [sortIsAsc, setSortIsAsc] = useState(false);
    //#endregion

    //#region Callbacks
    const GetUsers = async () => {

        const requestParams: IGetUsersRequest = {
            // page: currentPage,
        }

        const [response, error] = await handle(GetUsersRequest(requestParams));

        if (error) {
            alert('An error ocurred trying to get users')
            console.log(error);
            return;
        }

        const users: IUser[] = response.data.data;

        dispatch(SetUsers(users));
    }

    /** Remove user */
    const RemoveUser = async (user_id: string) => {
        const [response, error] = await handle(DeleteUserRequest(user_id));

        if (error) {
            const errorData: ApiAxiosErrorResponse = error;
            alert(`An error ocurred trying to delete this user\n• ${errorData.response.data.message}`)
            return;
        }

        alert('This user has been deleted')

        // Update users state
        const newUsers = users.filter(u => u.user_id != user_id);
        dispatch(SetUsers(newUsers));
    }

    const UpdateUser = (user: IUser) => {
        dispatch(SetUserToEdit(user));
    }

    const onPressPreviousPage = () => {
        setCurrentPage(currentPage - 1);
        GetUsers();
    }

    const onPressNextPage = () => {
        setCurrentPage(currentPage + 1);
        GetUsers();
    }

    /** Return filtered users with current users */
    const GetUsersFiltered = () => {
        let newUsersCopy : IUser[] = [...users];

        if(nameFilter){
            newUsersCopy = newUsersCopy.filter(u => u.user_name.includes(nameFilter))
        }

        if(userIdFilter){
            newUsersCopy = newUsersCopy.filter(u => u.user_id.includes(userIdFilter))
        }

        if(emailFilter){
            newUsersCopy = newUsersCopy.filter(u => u.mail.includes(emailFilter))
        }

        if(birthDayFilter){
            const birthDayToFilter = new Date(birthDayFilter);

            newUsersCopy = newUsersCopy.filter(u => GetFormatedDate(u.birthDay) == GetFormatedDate(birthDayToFilter))
        }

        return newUsersCopy;
    }

    const GetUsersSorted = (usersToSort: IUser[]) => {
        if(!sortSelected)
            return usersToSort;

        /** Sorted array per property */
        let sortedArray = usersToSort.sort((a: IUser, b: IUser) => {
            if (a[sortSelected] < b[sortSelected]) {
                return -1;
            }
            if (a[sortSelected] > b[sortSelected]) {
                return 1;
            }
            return 0;
        })

        if(!sortIsAsc)
            sortedArray = sortedArray.reverse();

        return sortedArray;
    }

    /** Enable sort */
    const onPressHeaderSortBtn = (key : keyof IUser) => {

        if(sortSelected != key)
            setSortIsAsc(false);
        else
            setSortIsAsc(!sortIsAsc);

        setSortSelected(key);

    }
    //#endregion

    useEffect(() => {
        GetUsers();
    }, [])

    useEffect(() => {

        // Get users fixed with filters & sort
        let usersCopy = GetUsersFiltered();
        usersCopy = GetUsersSorted(usersCopy);

        const newTotalPages = Math.ceil(usersCopy.length / 10);
        let currentPageToUse = currentPage;

        if(currentPageToUse == 0 && users.length > 0){   // Fix page
            setCurrentPage(currentPageToUse + 1);
        }

        if (currentPageToUse > newTotalPages) {
            // Fix page
            currentPageToUse = newTotalPages;
            setCurrentPage(currentPageToUse)
        }

        // Get elements for this page
        const newUsersToDisplay = usersCopy.splice((currentPageToUse - 1) * 10, 10);

        setTotalPages(newTotalPages);
        setUsersToDisplay(newUsersToDisplay);
    }, [users, nameFilter, userIdFilter, emailFilter, birthDayFilter,sortIsAsc,sortSelected])

    /** Table content */
    const rows = usersToDisplay.map((u, i) => {

        const onPressDelete = () => RemoveUser(u.user_id);
        const onPressEdit = () => UpdateUser(u);

        return (
            <tr key={`users-${i}`}>
                <td style={styleRow}>{u.user_name}</td>
                <td style={styleRow}>{u.user_id}</td>
                <td style={styleRow}>{u.mail}</td>
                <td style={styleRow}>{GetFormatedDate(u.birthDay)}</td>
                <td><UserActionbuttons {...{ onPressDelete, onPressEdit }} /></td>
            </tr>
        )
    })


    return (
        <ContentWithHeader headerLabel='Users list' style={props.style}>
            {/* List container */}
            <div className='UsersListContainer'>
                <table style={{ width: '100%' }}>
                    {/* Header */}
                    <thead>
                        <tr>
                            <UsersListHeaderElement label='Name' inputType='text' onChangeText={setNameFilter} onPressSortBtn={onPressHeaderSortBtn} propertyType='user_name' selectedSort={sortSelected} sortIsAsc={sortIsAsc} />
                            <UsersListHeaderElement label='C.C' inputType='text' onChangeText={setUserIdFilter} onPressSortBtn={onPressHeaderSortBtn} propertyType='user_id' selectedSort={sortSelected} sortIsAsc={sortIsAsc} />
                            <UsersListHeaderElement label='Email' inputType='text' onChangeText={setEmailFilter} onPressSortBtn={onPressHeaderSortBtn} propertyType='mail' selectedSort={sortSelected} sortIsAsc={sortIsAsc} />
                            <UsersListHeaderElement label='Birth day' inputType='date' onChangeText={setBirthDayFilter} onPressSortBtn={onPressHeaderSortBtn} propertyType='birthDay' selectedSort={sortSelected} sortIsAsc={sortIsAsc} />
                            <UsersListHeaderElement label='Action' inputType='text' propertyType='birthDay' hideInputWithSort />
                        </tr>
                    </thead>

                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>

            <Paginator {...{ onPressPreviousPage, onPressNextPage, currentPage, totalPages }} />
        </ContentWithHeader>
    )
}

const styleRow: React.CSSProperties = {
    // borderRightWidth: 2,
    // borderRightStyle: 'solid',

}
