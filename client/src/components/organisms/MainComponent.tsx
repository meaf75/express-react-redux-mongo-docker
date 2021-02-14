import { FormUserComponent } from "../molecules/FormUserComponent/FormUserComponent"
import { UsersListComponent } from "../molecules/UsersListComponent/UsersListComponent"

export const MainComponent = () => {
    return (
        <div style={content}>
            <FormUserComponent />
            <UsersListComponent style={listStlyle}/>
        </div>
    )
}

const content : React.CSSProperties = {
    flexDirection: 'row',
    display: 'flex',
    padding: 15,
}

const listStlyle : React.CSSProperties = {
    marginLeft: 15,
    flex: 1
}