import "./ContentWithHeader.css"

export interface IContentWithHeaderProps {
    /** Content */
    children: JSX.Element | JSX.Element[];
    headerLabel: string;
    style?: React.CSSProperties;
}

export const ContentWithHeader = (props: IContentWithHeaderProps) => {
    return (
        <div style={props.style}>
            <div className='content'>
                <p className='header-label'>{props.headerLabel}</p>

                <div className='header-content'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}