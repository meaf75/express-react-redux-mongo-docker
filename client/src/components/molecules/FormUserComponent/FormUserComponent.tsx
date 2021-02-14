import { InputWithLabel } from "../../Atoms/InputWithLabel"
import { useForm } from "react-hook-form";
import { IUser } from "../../../interfaces/IUser";
import "./FormUserComponent.css";
import { ContentWithHeader } from "../ContentWithHeader/ContentWithHeader";
import { handle } from "../../../utils/PromiseHandler";
import { SaveOrUpdateUserRequest } from "../../../services/users.service";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetUsers, SetUserToEdit } from "../../../store/app/AppAction";
import { RootState } from "../../../store";
import { ApiAxiosErrorResponse } from "../../../Types/ApiAxiosErrorResponse";
import { isValidEmail } from "../../../utils/IsEmail";
import { useEffect } from "react";
import { GetFormatedDateForInput } from "../../../utils/GetFormatedDateForInput";
import { ApiAxiosResponse } from "../../../Types/ApiAxiosResponse";

interface FormField {
    inputLabel: string;
    controlName: keyof IUser;
    inputType: 'date' | 'text';
}

/** Fields required in the form */
const formFields: FormField[] = [
    {
        inputLabel: 'Name',
        controlName: 'user_name',
        inputType: 'text'
    },
    {
        inputLabel: 'C.C',
        controlName: 'user_id',
        inputType: 'text'
    },
    {
        inputLabel: 'Email',
        controlName: 'mail',
        inputType: 'text'
    },
    {
        inputLabel: 'Birth day',
        controlName: 'birthDay',
        inputType: 'date'
    },
]

export const FormUserComponent = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.app.users);
    const userToEdit = useSelector((state: RootState) => state.app.userToEdit);
    const { register, errors, handleSubmit, reset,setValue } = useForm<IUser>();

    /** Create or update user */
    const SaveOrUpdateUser = async (data: IUser) => {

        //#region Verify inputs
        let inputErrorMsg = '';

        if(!isValidEmail(data.mail)){
            inputErrorMsg = 'Providen email value must be a valid email';
        }

        if(data.user_name.length < 3){
            inputErrorMsg = 'Name length must be greatter than 3';
        }

        if(data.user_id.length < 6){
            inputErrorMsg = 'User id length must be greatter than 3';
        }

        if(inputErrorMsg){
            alert(inputErrorMsg);
            return;
        }
        //#endregion

        data.user_id = data.user_id.toLocaleLowerCase();

        // Send data
        const [response, error] = await handle(SaveOrUpdateUserRequest(data));

        if (error) {            
            const errorData = error as ApiAxiosErrorResponse;
            alert('An error ocurred trying to add/update users: \n• '+errorData.response.data.message)
            
            return;
        }

        const responseData : ApiAxiosResponse = response;
        const newUser : IUser = responseData.data.data;

        if(responseData.data.updated){
            // Update user
            TryUpdateUserInUsersList(newUser);
        }else{
            // Add new user to list
            dispatch(SetUsers([...users,newUser]))
    
            reset({
                birthDay: '',
                created_at: '',
                mail: '',
                user_id: '',
                user_name: ''
            });
        }

        const msg = responseData.data.message;
        alert(msg)
    }

    /** Update user in list if exist */
    const TryUpdateUserInUsersList = (user: IUser) => {
        const newUsers = [...users];
        const userToUpdateIdx = newUsers.findIndex(u => u.user_id == user.user_id);

        if(userToUpdateIdx == -1)
            return;

        newUsers[userToUpdateIdx] = user;
        
        dispatch(SetUsers(newUsers));
    }

    useEffect(() => {
        if(!userToEdit)
            return;

        const newData : any = userToEdit;
        newData.birthDay = GetFormatedDateForInput(userToEdit.birthDay);

        reset(userToEdit);
        
        // Restore user to edit state, allow select again the same last user data
        dispatch(SetUserToEdit(null));
    },[userToEdit])

    //#region pre content jsx definitions
    const formContent = formFields.map((f, i) => {
        return (
            <div key={`form-key-${i}`}>
                <InputWithLabel inputName={f.controlName} inputRef={register({ required: true })} label={f.inputLabel} inputType={f.inputType} />
                {errors[f.controlName] && <span className='error-msg'>{`${f.inputLabel} is required`}</span>}
            </div>
        )
    });
    //#endregion

    return (
        <ContentWithHeader headerLabel='Formulario'>
            <form onSubmit={handleSubmit(SaveOrUpdateUser)} className='form-content'>
                {formContent}
                <button type='submit'>Save / Update</button>
            </form>
        </ContentWithHeader>
    )
}