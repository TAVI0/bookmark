

function TableBookLogs(props){
    return(
        <nav>
            <table>
                <thead>
                    <tr className="header">
                        <th>img</th>
                        <th>Book</th>
                        <th>Autor</th>
                        <th>Released</th>
                        <th>add-finish</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Like</th>
                        <th>Edit</th>
                    </tr>    
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </nav>
    );
}

export {TableBookLogs};