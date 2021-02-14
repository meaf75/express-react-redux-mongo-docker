export interface IPaginator {
    currentPage: number;
    totalPages: number;
    onPressPreviousPage: () => void;
    onPressNextPage: () => void;
}

export default (props: IPaginator) => {

    const prevBtn = props.currentPage > 1 ? (
        <button onClick={props.onPressPreviousPage}>Previous</button>
    ) : undefined;

    const nextBtn = props.currentPage < props.totalPages ? (
        <button onClick={props.onPressNextPage}>Next</button>
    ) : undefined;

    return (
        <div style={content}>
            <div>
                {prevBtn}
            </div>

            <span>{props.currentPage} de {props.totalPages} total {props.totalPages}</span>

            <div>
                {nextBtn}
            </div>
        </div>
    )
}




const content: React.CSSProperties = {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderWidth: 2,
    marginTop: 6,
    padding: 5
} 
