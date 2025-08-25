import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Phone, Mail, Store, Calendar, MessageCircle, Heart } from 'lucide-react';
import { PetCard } from '@/components/pets/PetCard';
import { mockPets } from '@/data/mockData';
import { transformMockPetsToPets } from '@/utils/dataTransformers';

export default function ShopDetails() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const shop = {
    id: parseInt(id || '1'),
    name: 'Happy Paws Pet Store',
    description: 'Your friendly neighborhood pet store with over 20 years of experience in connecting loving families with their perfect companions.',
    location: 'New York, NY',
    fullAddress: '123 Main Street, New York, NY 10001',
    rating: 4.8,
    reviews: 124,
    avatar: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=200&q=60',
    coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=60',
    activePets: 15,
    memberSince: '2019',
    phone: '+1 (555) 123-4567',
    email: 'info@happypaws.com',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '10:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    specialties: ['Dogs', 'Cats', 'Birds', 'Small Animals'],
    totalSold: 156,
    followers: 892
  };

  const shopPets = transformMockPetsToPets(mockPets.filter(pet => Math.random() > 0.5).slice(0, 8));

  const handleWhatsApp = () => {
    const message = `Hi! I'd like to know more about your pet shop - ${shop.name}`;
    window.open(`https://wa.me/${shop.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStartChat = () => {
    // Navigate to chat interface
    window.location.href = `/chat/shop-${shop.id}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Cover Image */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <img 
          src={shop.coverImage} 
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{shop.rating}</span>
            <span className="opacity-80">({shop.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="pets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pets">Available Pets</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="pets" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Available Pets ({shopPets.length})</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save Shop
                  </Button>
                  <Button 
                    variant={isFollowing ? "secondary" : "default"} 
                    size="sm"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow Shop'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shopPets.map((pet) => (
                  <PetCard key={pet.listingid} pet={pet} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {shop.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{shop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Stats</h4>
                      <div className="space-y-1 text-sm">
                        <div>Total Pets Sold: <span className="font-medium">{shop.totalSold}</span></div>
                        <div>Followers: <span className="font-medium">{shop.followers}</span></div>
                        <div>Member Since: <span className="font-medium">{shop.memberSince}</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`https://images.unsplash.com/photo-15${review}0000000000?auto=format&fit=crop&w=100&q=60`} />
                          <AvatarFallback>U{review}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Customer {review}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">2 weeks ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Great experience! The staff was very knowledgeable and helped us find the perfect puppy for our family.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shop Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={shop.avatar} alt={shop.name} />
                  <AvatarFallback>{shop.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{shop.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{shop.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button className="w-full" onClick={handleStartChat}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
                <Button variant="outline" className="w-full" onClick={handleWhatsApp}>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.06 18.34c-1.4 0-2.78-.38-3.99-1.11l-.29-.17-2.99.78.8-2.91-.18-.3c-.8-1.27-1.22-2.74-1.22-4.25 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m4.38-5.93c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28"/>
                  </svg>
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = `mailto:${shop.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Contact Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{shop.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{shop.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span>{shop.fullAddress}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(shop.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize">{day}:</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
