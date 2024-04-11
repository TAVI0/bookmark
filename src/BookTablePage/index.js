import { useParams } from "react-router-dom";
import { BookLog } from "./BookLog";
import React from 'react';
import { useGetBookmarkApi } from "../Hooks/useGetBookmarkApi";

function BookTablePage () {
    const { username } = useParams();
   // const {posts, loading} = useGetPostByUsername(username);

    const {data:posts, loading} = useGetBookmarkApi("/post/username/",username);

    if (loading) {
        return <p>Cargando...</p>;
    }
    return (
        <>
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
                    {posts.map((post) => (
                    <BookLog
                        key={post.id}
                        post={post}
                    />))}
                </tbody>
            </table>
        </>
    );
    
}

export { BookTablePage  };
