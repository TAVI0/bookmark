import { useParams } from "react-router-dom";
import { BookLog } from "./BookLog";
import React from 'react';
import { useFetch } from "../Hooks/useFetch";
import "./index.css"

function BookTablePage () {
    const { username } = useParams();

    const {data:posts, loading} = useFetch("http://localhost:8080/post/username/"+username);


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
                        <th>start</th>
                        <th>-</th>
                        <th>end</th>
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
