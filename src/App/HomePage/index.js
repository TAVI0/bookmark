import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'  
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { BookOpen, Search, Star, List, Bell, Settings, LogOut } from 'lucide-react'

import { useAuth } from '../auth/AuthProvider'

export default function HomePage() {
  const auth = useAuth();
  
  
  return (
    <div className="min-h-screen bg-[#14171c] text-[#677785]">
    

      {/* Contenido principal */}
      <main className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold text-[#8eacbb]">Bienvenido de vuelta, <span className="text-[#677785]">{auth.userLogin}</span></h1>

        {/* Actividad de amigos */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#8eacbb]">Actividad de amigos</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((activity) => (
              <Card key={activity} className="bg-[#1c2026] border-[#677785]/30">
                <CardContent className="flex items-center space-x-4 p-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=Amigo${activity}`} alt={`Amigo ${activity}`} />
                    <AvatarFallback>A{activity}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#8eacbb]">Amigo {activity}</p>
                    <p className="text-sm text-[#677785]">
                      {activity === 1
                        ? "ha terminado de leer 'El nombre del viento'"
                        : activity === 2
                        ? "ha añadido 'Dune' a su lista de lectura"
                        : "ha publicado una reseña de '1984'"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mejores reseñas */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#8eacbb]">Mejores reseñas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((review) => (
              <Card key={review} className="bg-[#1c2026] border-[#677785]/30">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User${review}`} alt={`Usuario ${review}`} />
                      <AvatarFallback>U{review}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#8eacbb]">Usuario {review}</p>
                      <p className="text-xs text-[#677785] mb-2">sobre "Título del Libro {review}"</p>
                      <p className="text-sm text-[#677785] mb-2">
                        "Esta novela es una obra maestra de la literatura contemporánea. La prosa es cautivadora y los personajes están increíblemente bien desarrollados. Una lectura imprescindible para cualquier amante de la ficción."
                      </p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= review ? "text-yellow-400 fill-yellow-400" : "text-[#677785]"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Libros recomendados */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[#8eacbb]">Recomendados para ti</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((book) => (
              <Card key={book} className="bg-[#1c2026] border-[#677785]/30">
                <CardContent className="p-4">
                  <img
                    src={`/placeholder.svg?height=240&width=160&text=Libro ${book}`}
                    alt={`Libro ${book}`}
                    className="mb-2 h-48 w-full object-cover"
                  />
                  <h3 className="text-sm font-semibold text-[#8eacbb]">Título del Libro {book}</h3>
                  <p className="text-xs text-[#677785]">Autor del Libro {book}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export { HomePage }