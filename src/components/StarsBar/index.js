import { BsStarFill, BsStarHalf, BsStar  } from 'react-icons/bs';

function StarsBar(){

    return(
        <div>
            <BsStarFill fill="black"/><BsStar fill="black"/><BsStarHalf fill="black"/><BsStarFill fill="black"/><BsStarFill fill="black"/>
        </div>
    )
}

export{ StarsBar };