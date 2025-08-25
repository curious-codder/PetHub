
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2, MapPin, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/apiService';

interface PetDetailsModalProps {
  petId: string | number;
  isOpen: boolean;
  onClose: () => void;
}

interface PetDetails {
  listingid: number;
  petname: string;
  breedname?: string;
  age: string;
  price: number;
  location: string;
  status: string;
  description?: string;
  gender?: string;
  size?: string;
  color?: string;
  healthstatus?: string;
  vaccinationstatus?: string;
  isneutered?: boolean;
  images?: { imageurl: string; isprimary: boolean }[];
}

export function PetDetailsModal({ petId, isOpen, onClose }: PetDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [pet, setPet] = useState<PetDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && petId) {
      loadPetDetails();
    }
  }, [isOpen, petId]);

  const loadPetDetails = async () => {
    setLoading(true);
    try {
      const petData = await apiService.getPetById(Number(petId));
      setPet(petData);
    } catch (error) {
      console.error('Failed to load pet details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="text-center py-8">
            {loading ? 'Loading pet details...' : 'Pet not found'}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const images = pet.images?.map(img => img.imageurl) || ['/placeholder.svg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleStartChat = () => {
    onClose();
    navigate(`/chat/${petId}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${pet.petname} - ${pet.breedname} listed for $${pet.price}`;
    window.open(`https://wa.me/15551234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{pet.petname}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={images[currentImageIndex]} 
                alt={pet.petname}
                className="w-full h-80 object-cover rounded-lg"
              />
              {images.length > 1 && (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant={isLiked ? "default" : "secondary"}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button size="sm" variant="secondary">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pet Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{pet.breedname || 'Mixed Breed'}</h3>
                <p className="text-muted-foreground">{pet.age}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">${pet.price}</p>
                <Badge variant={pet.status === 'Available' ? 'default' : 'secondary'}>
                  {pet.status}
                </Badge>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-semibold">{pet.gender || 'Not specified'}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-semibold">{pet.size || 'Not specified'}</p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">About {pet.petname}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pet.description || `${pet.petname} is a wonderful pet looking for a loving home.`}
              </p>
            </div>

            {/* Health & Training */}
            <div>
              <h4 className="font-semibold mb-3">Health & Training</h4>
              <div className="grid grid-cols-2 gap-2">
                {pet.vaccinationstatus && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{pet.vaccinationstatus}</span>
                  </div>
                )}
                {pet.healthstatus && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{pet.healthstatus}</span>
                  </div>
                )}
                {pet.isneutered !== null && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{pet.isneutered ? 'Spayed/Neutered' : 'Not Spayed/Neutered'}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{pet.location || 'Location not specified'}</span>
            </div>

            {/* Contact Actions */}
            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={handleStartChat}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={handleWhatsApp}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.06 18.34c-1.4 0-2.78-.38-3.99-1.11l-.29-.17-2.99.78.8-2.91-.18-.3c-.8-1.27-1.22-2.74-1.22-4.25 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m4.38-5.93c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28"/>
                </svg>
                WhatsApp Contact
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
