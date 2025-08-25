import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Share2, MapPin, Calendar, Shield, Star, Phone, Mail, ArrowLeft } from 'lucide-react';
import { mockPets } from '@/data/mockData';

export default function PetDetails() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock pet data - in real app would fetch by ID
  const pet = mockPets[0];
  const seller = {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60',
    rating: 4.8,
    reviews: 24,
    memberSince: '2021',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com'
  };

  const images = [
    pet.image,
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=60'
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={images[currentImageIndex]} 
                alt={pet.name}
                className="w-full h-96 object-cover rounded-lg"
              />
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
            
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${pet.name} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-60'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Pet Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{pet.name}</CardTitle>
                  <CardDescription className="text-lg">{pet.breed}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">${pet.price}</p>
                  <Badge variant={pet.status === 'available' ? 'default' : 'secondary'}>
                    {pet.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold">{pet.age}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-semibold">Male</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">Large</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold">65 lbs</p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-3">About {pet.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pet.name} is a wonderful, loving {pet.breed.toLowerCase()} who is looking for a forever home. 
                  He is well-trained, loves children, and gets along great with other pets. He has been vaccinated 
                  and comes with all health certificates. This gentle giant loves long walks, playing fetch, and 
                  cuddling on the couch. He would make a perfect addition to any loving family.
                </p>
              </div>

              <Separator />

              {/* Health & Training */}
              <div>
                <h3 className="font-semibold mb-3">Health & Training</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Vaccinated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Health Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">House Trained</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Spayed/Neutered</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{pet.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Seller Info & Actions */}
        <div className="space-y-6">
          {/* Contact Actions */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button className="w-full" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={seller.avatar} alt={seller.name} />
                  <AvatarFallback>{seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{seller.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{seller.rating}</span>
                    <span className="text-sm text-muted-foreground">({seller.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {seller.memberSince}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  {seller.phone}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  {seller.email}
                </Button>
              </div>

              <Button variant="ghost" className="w-full">
                View Seller Profile
              </Button>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Safety Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Meet in a public place for initial contact</p>
              <p>• Verify health certificates and vaccinations</p>
              <p>• Ask for references from previous buyers</p>
              <p>• Never send money before meeting the pet</p>
              <p>• Trust your instincts about the seller</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}