import { BookContext } from "../BookContext";
import { BookLog } from "./BookLog";
import { TableBookLogs } from "./TableBookLogs";
import React from 'react';

function BookTablePage () {
    const {
      booklogs,
    } = React.useContext(BookContext);

    return (
        <>
            <TableBookLogs>
            {booklogs.map((book) => (
                <BookLog
                key={book.id}
                googId={book.googId}
                startedDate={book.startedDate}
                complatedDate={book.complatedDate}
                score={book.score}
                review={book.review}
                liked={book.liked}
                />
            ))}
            </TableBookLogs>
        </>
    );
}

export { BookTablePage  };
