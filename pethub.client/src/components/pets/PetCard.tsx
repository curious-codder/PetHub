
import { useState } from 'react';
import { Heart, MessageCircle, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Pet {
  listingid: string | number;
  petname: string;
  breedname?: string;
  age: string;
  price: number;
  imageurl: string;
  location: string;
  status: 'Available' | 'Sold' | 'Pending';
}

interface PetCardProps {
  pet: Pet;
  onLike?: (petId: string | number) => void;
  onContact?: (petId: string | number) => void;
}

export function PetCard({ pet, onLike, onContact }: PetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pet/${pet.listingid}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(pet.listingid);
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onContact) {
      onContact(pet.listingid);
    }
    navigate(`/chat/${pet.listingid}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <div className="relative">
        <img 
          src={pet.imageurl || '/placeholder.svg'} 
          alt={pet.petname}
          className="w-full h-48 object-cover"
        />
        <Button
          size="sm"
          variant={isLiked ? "default" : "secondary"}
          className="absolute top-2 right-2"
          onClick={handleHeartClick}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <Badge 
          variant={pet.status === 'Available' ? 'default' : 'secondary'}
          className="absolute top-2 left-2"
        >
          {pet.status}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{pet.petname}</h3>
            <p className="text-muted-foreground">{pet.breedname || 'Mixed Breed'}</p>
          </div>
          <p className="text-lg font-bold text-primary">${pet.price}</p>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span>{pet.location || 'Location not specified'}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleChatClick}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
