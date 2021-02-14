import { IUser } from "../../interfaces/IUser"

export interface IHeaderElementProps {
    propertyType: keyof IUser;
    label: string;
    hideInputWithSort?: boolean;
    inputType: 'date' | 'text';
    onChangeText?: FunctionStringCallback
    onPressSortBtn?: (key : keyof IUser) => void
    selectedSort?: keyof IUser | '';
    sortIsAsc?: boolean;
}

export const UsersListHeaderElement = (props: IHeaderElementProps) => {

    /** Excecute callback on update input */
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onChangeText)  // Action button does not require this
            props.onChangeText(e.target.value);
    }

    /** Excecute sort */
    const onPressSortBtn = () => {
        if(props.onPressSortBtn)    // Action button does not require this
            props.onPressSortBtn(props.propertyType);
    }

    let sortLabelTxt = '↕';

    if(props.selectedSort == props.propertyType){
        sortLabelTxt = props.sortIsAsc ? '🔼' : '🔽';
    }

    const inputWithSort = !props.hideInputWithSort ? (
        <div style={styleContent}>
            <input type={props.inputType} onChange={onChangeValue}/>

            <span style={styleSortBtn} onClick={onPressSortBtn}>{sortLabelTxt}</span>
        </div>
    ) : null;

    return (
        <th>
            {props.label}

            {inputWithSort}
        </th>
    )
}

const styleContent: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginRight: 5
}

const styleSortBtn: React.CSSProperties = {
    cursor: 'pointer'
} 
