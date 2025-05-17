import React, { useContext, useEffect, useState } from "react";
import { BookContext } from "../BookContext/index.js";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { useParams } from "react-router-dom";
import './index.css'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Star, MessageCircle, Share2, Bookmark, ChevronLeft } from 'lucide-react'
import { postService } from "../services/postService.ts";
const sampleComments = [
  { id: 1, user: { username: 'Lector1', avatar: '/placeholder.svg?height=40&width=40' }, content: 'Totalmente de acuerdo. Este libro me mantuvo despierto toda la noche.', date: '2023-05-15' },
  { id: 2, user: { username: 'Crítico2', avatar: '/placeholder.svg?height=40&width=40' }, content: 'Interesante perspectiva. Aunque creo que el ritmo decae un poco en la mitad.', date: '2023-05-16' },
  { id: 3, user: { username: 'FanFantasía', avatar: '/placeholder.svg?height=40&width=40' }, content: 'La construcción del mundo es simplemente asombrosa. Rothfuss es un genio.', date: '2023-05-17' }
]
function PostPage(){

    const { username, postName } = useParams();
    const postNameStr = postName.replace(/-+/g, ' ');
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [spoilerView, setSpoilerView] = useState(true);

  useEffect(() => {
    if (!username || !postName) return;

    setLoading(true);
    postService
      .getByPath(username, postName, 1)
      .then(data => {
        setPost(data);
        setSpoilerView(data.spoiler);
      })
      .catch(err => {
        console.error('Error al obtener los datos:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username, postName]);
    
  const { starsSistem } = useContext(BookContext);
  if (loading || !post) return <p>Cargando…</p>;

    
    console.log(post)
    const book = post.book;
    
    const {completedStars,halfStar} = starsSistem(post.rated);
    const HasReview = post.review != null && <GrTextAlignFull/>;
    const liked = post.liked ? <BsFillSuitHeartFill fill='red'/> : <BsFillSuitHeartFill fill='gray'/>;
    const dateObject = new Date(post.datePost);
    const formattedDate = dateObject.toLocaleDateString("en-GB"); // Formato "yyyy-mm-dd"
    
    const handleClick = () => {
      setSpoilerView(false);
      console.log("llegoaca")
    };
  
const handleSpoilerClick = () => setSpoilerView(false)

const renderStars = (rated) => {
  const rating= rated/2;
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    } else if (i - 0.5 <= rating) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" strokeWidth={0} clipPath="inset(0 50% 0 0)" />)
    } else {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />)
    }
  }
  return stars
}

return (
  <div className="min-h-screen bg-[#14171c] text-[#677785]">

    {/* Contenido principal */}
    <main className="container mx-auto py-8">
      <Card className="bg-[#1c2026] border-[#677785]/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Imagen del libro */}
            <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
              <img className="w-full md:w-48 rounded-lg shadow-lg"  src ="/logobook.png" alt={`Portada de ${book.name}`} />
            </div>

            {/* Detalles del libro y reseña */}
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-[#8eacbb] mb-2">{book.name}</h2>
              <p className="text-lg mb-4">por {book.writer}</p>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(post.rated)}</div>
                <span className="text-lg font-semibold">{post.rated/2}</span>
              </div>
              <p className="mb-2 text-sm">Género: {book.genre}</p>
              <p className="mb-4 text-sm">Año de publicación: {book.publicationYear}</p>

              {/* Información del usuario y reseña */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Avatar className="mr-2">
                    <AvatarImage src="/avatar.jpg" alt={post.userEntity.username} />
                    <AvatarFallback>{post.userEntity.username[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-[#8eacbb]">Reseña por {post.userEntity.username}</span>
                </div>
                <div className="bg-[#14171c] p-4 rounded-lg">
                  {spoilerView ? (
                    <div className="text-center">
                      <p className="text-red-400 font-bold mb-2">¡ALERTA DE SPOILERS!</p>
                      <Button onClick={handleSpoilerClick} variant="outline" className="text-[#8eacbb]">
                        Mostrar reseña
                      </Button>
                    </div>
                  ) : (
                    <p className="text-[#8eacbb]">{post.review}</p>
                  )}
                </div>
              </div>   

              {/* Acciones de la reseña */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Button variant="ghost" className="text-[#8eacbb]">
                      <Star className="mr-2 h-4 w-4" />
                      {post.likes} Me gusta
                    </Button>
                  </div>
                  <Button variant="ghost" className="text-[#8eacbb]">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>       
            </div>
          </div>
            <h3 className="text-2xl font-bold text-[#8eacbb] mb-4">Comentarios</h3>
            <div className="space-y-4">
              {sampleComments.map(comment => (
                <div key={comment.id} className="bg-[#14171c] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Avatar className="mr-2">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
                      <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold text-[#8eacbb]">{comment.user.username}</span>
                      <span className="text-xs text-[#677785] ml-2">{comment.date}</span>
                    </div>
                  </div>
                  <p className="text-[#677785]">{comment.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      
    </main>
  </div>
)
}
export { PostPage }
