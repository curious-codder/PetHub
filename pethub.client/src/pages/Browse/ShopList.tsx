import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, Store, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShopList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleShops, setVisibleShops] = useState(6);

  const shops = [
    {
      id: 1,
      name: 'Happy Paws Pet Store',
      description: 'Your friendly neighborhood pet store with over 20 years of experience.',
      location: 'New York, NY',
      rating: 4.8,
      reviews: 124,
      avatar: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=100&q=60',
      activePets: 15,
      memberSince: '2019',
      phone: '+1 (555) 123-4567',
      email: 'info@happypaws.com'
    },
    {
      id: 2,
      name: 'Golden Retriever Breeders',
      description: 'Specialized in Golden Retrievers with champion bloodlines.',
      location: 'Los Angeles, CA',
      rating: 4.9,
      reviews: 89,
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=60',
      activePets: 8,
      memberSince: '2020',
      phone: '+1 (555) 987-6543',
      email: 'contact@goldenretrievers.com'
    },
    {
      id: 3,
      name: 'Exotic Birds Paradise',
      description: 'Specializing in rare and exotic bird species.',
      location: 'Miami, FL',
      rating: 4.7,
      reviews: 56,
      avatar: 'https://images.unsplash.com/photo-1520637836862-4d197e17c90a?auto=format&fit=crop&w=100&q=60',
      activePets: 22,
      memberSince: '2018',
      phone: '+1 (555) 456-7890',
      email: 'info@exoticbirds.com'
    },
    {
      id: 4,
      name: 'Furry Friends Rescue',
      description: 'Dedicated to finding loving homes for rescued pets.',
      location: 'Chicago, IL',
      rating: 4.9,
      reviews: 203,
      avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=100&q=60',
      activePets: 35,
      memberSince: '2017',
      phone: '+1 (555) 234-5678',
      email: 'adopt@furryfriendsrescue.com'
    },
    {
      id: 5,
      name: 'Premium Puppies',
      description: 'High-quality puppies from certified breeders.',
      location: 'Dallas, TX',
      rating: 4.6,
      reviews: 76,
      avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=100&q=60',
      activePets: 12,
      memberSince: '2021',
      phone: '+1 (555) 345-6789',
      email: 'info@premiumpuppies.com'
    },
    {
      id: 6,
      name: 'Aquatic Wonders',
      description: 'Your destination for beautiful tropical fish and aquatic pets.',
      location: 'Seattle, WA',
      rating: 4.8,
      reviews: 134,
      avatar: 'https://images.unsplash.com/photo-1520637736862-4d197e17c90a?auto=format&fit=crop&w=100&q=60',
      activePets: 28,
      memberSince: '2019',
      phone: '+1 (555) 456-7891',
      email: 'hello@aquaticwonders.com'
    },
    {
      id: 7,
      name: 'Mountain View Pets',
      description: 'Family-owned pet store serving the community for 15 years.',
      location: 'Denver, CO',
      rating: 4.7,
      reviews: 92,
      avatar: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=100&q=60',
      activePets: 18,
      memberSince: '2018',
      phone: '+1 (555) 567-8901',
      email: 'contact@mountainviewpets.com'
    }
  ];

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedShops = filteredShops.slice(0, visibleShops);

  const loadMoreShops = () => {
    setVisibleShops(prev => prev + 6);
  };

  const handleWhatsApp = (shop: typeof shops[0]) => {
    const message = `Hi! I'd like to know more about your pet shop - ${shop.name}`;
    window.open(`https://wa.me/${shop.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Pet Shops</h1>
        <p className="text-muted-foreground">Browse trusted pet shops and breeders</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search shops by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {displayedShops.length} of {filteredShops.length} shops
        </p>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedShops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={shop.avatar} alt={shop.name} />
                  <AvatarFallback>{shop.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{shop.name}</CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                    <span className="text-sm text-muted-foreground">({shop.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{shop.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">{shop.description}</p>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-muted-foreground" />
                  <span>{shop.activePets} Active Pets</span>
                </div>
                <Badge variant="outline">Since {shop.memberSince}</Badge>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/shop/${shop.id}`}>
                    Visit Shop
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleWhatsApp(shop)}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.06 18.34c-1.4 0-2.78-.38-3.99-1.11l-.29-.17-2.99.78.8-2.91-.18-.3c-.8-1.27-1.22-2.74-1.22-4.25 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m4.38-5.93c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${shop.email}`}>
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {visibleShops < filteredShops.length && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={loadMoreShops}>
            Load More Shops ({filteredShops.length - visibleShops} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
