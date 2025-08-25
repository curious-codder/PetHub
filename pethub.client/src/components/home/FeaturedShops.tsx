import { Link } from 'react-router-dom';
import { Star, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { mockShops } from '@/data/mockData';

export function FeaturedShops() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Pet Shops
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified pet shops and professional breeders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockShops.map((shop) => (
            <Card key={shop.id} className="shop-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{shop.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{shop.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {shop.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {shop.petCount} pets available
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {shop.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {shop.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="category-chip">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/shops/${shop.id}`}>
                    Visit Shop
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shops">
            <button className="btn-primary">
              View All Shops
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}