import { BookContext } from "../BookContext";
import { useGetPostByUsername } from "../BookContext/useGetPostByUsername";
import { BookLog } from "./BookLog";
import { TableBookLogs } from "./TableBookLogs";
import React from 'react';

function BookTablePage () {
    const { booklogs } = React.useContext(BookContext);

    const {posts, loading} = useGetPostByUsername("TAVI0");

/*
        <TableBookLogs>
            {posts.map((post) => (
                <BookLog
                post={post}
                />
            ))}
        </TableBookLogs>
        
        {posts.map(post=>
            console.log(post)
        )}

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
    */
    if (loading) {
        return <p>Cargando...</p>;
    }
    return (
        <>
        {
        //console.log(posts)
        }
        <TableBookLogs>
            {posts.map((post) => (
                <BookLog
                key={post.id}
                post={post}
                />
            ))}
        </TableBookLogs>
        </>
    );
    
}

export { BookTablePage  };
