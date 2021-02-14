export interface IUserActionbuttons {
    onPressDelete: () => void
    onPressEdit: () => void
}

export const UserActionbuttons = (props: IUserActionbuttons) => {
    return (
        <div style={content}>
            <button style={btnStyle} onClick={props.onPressEdit}>🖍</button>
            <button style={btnStyle} onClick={props.onPressDelete}>❌</button>
        </div>
    )
}

const btnStyle : React.CSSProperties = {
    cursor: 'pointer'
}

const content : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
}
