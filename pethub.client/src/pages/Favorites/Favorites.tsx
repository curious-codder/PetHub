
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, X } from 'lucide-react';
import { mockPets } from '@/data/mockData';

export default function Favorites() {
  const [likedPets, setLikedPets] = useState(mockPets.slice(0, 6));

  const removeFavorite = (petId: string) => {
    setLikedPets(likedPets.filter(pet => pet.id !== petId));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Favorites</h1>
        <p className="text-muted-foreground">Pets you've saved for later ({likedPets.length} pets)</p>
      </div>

      {likedPets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">Start browsing and save pets you love!</p>
            <Button>Browse Pets</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedPets.map((pet) => (
            <Card key={pet.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={pet.image} 
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFavorite(pet.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Badge 
                  variant={pet.status === 'available' ? 'default' : 'secondary'}
                  className="absolute bottom-2 left-2"
                >
                  {pet.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{pet.name}</h3>
                  <p className="text-2xl font-bold text-primary">${pet.price}</p>
                </div>
                <p className="text-muted-foreground mb-1">{pet.breed}</p>
                <p className="text-sm text-muted-foreground mb-4">{pet.age} • {pet.location}</p>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="px-3">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
