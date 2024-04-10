import React from "react";

function useGoogleApiBooks(googId){

const [bookData, setBookData] = React.useState();

React.useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${googId}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        setBookData(data)})
}, [googId]);

return{ bookData };
}

export { useGoogleApiBooks}