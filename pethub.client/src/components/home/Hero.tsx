import { Search, Heart, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: Heart, value: '10K+', label: 'Pets Sold' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Users, value: '2K+', label: 'Active Sellers' }
  ];

  return (
    <section className="relative gradient-background py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/15 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {' '}Pet Companion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Connect with trusted breeders and pet lovers worldwide. Your new best friend is just a click away.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for dogs, cats, birds, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary"
              />
            </div>
            <Button size="lg" className="btn-primary h-12 px-8">
              Search Pets
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm">
              Browse All Pets
            </Button>
            <Button size="lg" className="btn-secondary">
              Post Your Pet
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-soft">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}