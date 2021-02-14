
export interface InputWithLabelProps {
    inputName: string;
    label: string;
    inputType: 'date' | 'text';
    inputRef?: any;
}


export const InputWithLabel = (props: InputWithLabelProps) => {
    return (
        <div>
            <label>{props.label}</label>
            <br/>
            <input type={props.inputType} name={props.inputName} ref={props.inputRef} />
        </div>
    )
}