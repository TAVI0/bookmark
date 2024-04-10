import { useParams } from "react-router-dom";
import { useGetPostByUsername } from "../Hooks/useGetPostByUsername";
import { BookLog } from "./BookLog";
import { TableBookLogs } from "./TableBookLogs";
import React from 'react';

function BookTablePage () {
    const { username } = useParams();
    const {posts, loading} = useGetPostByUsername(username);

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
