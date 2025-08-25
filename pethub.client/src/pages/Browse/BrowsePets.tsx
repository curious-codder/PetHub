import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { PetCard } from '@/components/pets/PetCard';
import { PetDetailsModal } from '@/components/pet-details/PetDetailsModal';
import { mockPets } from '@/data/mockData';
import { transformMockPetsToPets } from '@/utils/dataTransformers';

export default function BrowsePets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [visiblePets, setVisiblePets] = useState(12);

  // Transform mock data to Pet format
  const transformedPets = transformMockPetsToPets(mockPets);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'bird', label: 'Birds' },
    { value: 'fish', label: 'Fish' },
    { value: 'rabbit', label: 'Rabbits' },
    { value: 'other', label: 'Other' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000+', label: 'Over $2,000' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'miami', label: 'Miami, FL' }
  ];

  // Filter pets based on search and filters
  const filteredPets = transformedPets.filter(pet => {
    const matchesSearch = pet.petname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (pet.breedname && pet.breedname.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           (pet.breedname && pet.breedname.toLowerCase().includes(selectedCategory));
    
    const matchesPrice = priceRange === 'all' || (() => {
      const price = pet.price;
      switch (priceRange) {
        case '0-500': return price < 500;
        case '500-1000': return price >= 500 && price <= 1000;
        case '1000-2000': return price >= 1000 && price <= 2000;
        case '2000+': return price > 2000;
        default: return true;
      }
    })();

    const matchesLocation = location === 'all' || 
                           pet.location.toLowerCase().includes(location.replace('-', ' '));

    return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
  });

  const displayedPets = filteredPets.slice(0, visiblePets);

  const loadMorePets = () => {
    setVisiblePets(prev => prev + 12);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange('all');
    setLocation('all');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Pets</h1>
        <p className="text-muted-foreground">Find your perfect companion from our wide selection of pets</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search pets, breeds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => console.log('Search applied')}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={() => console.log('Advanced filters')}>
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || priceRange !== 'all' || location !== 'all' || searchQuery) && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Active Filters:</h3>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary">
                Search: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary">
                Category: {categories.find(c => c.value === selectedCategory)?.label}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary">
                Price: {priceRanges.find(p => p.value === priceRange)?.label}
                <button 
                  onClick={() => setPriceRange('all')}
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {location !== 'all' && (
              <Badge variant="secondary">
                Location: {locations.find(l => l.value === location)?.label}
                <button 
                  onClick={() => setLocation('all')}
                  className="ml-2 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {displayedPets.length} of {filteredPets.length} pets
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="age">Age: Young to Old</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedPets.map((pet) => (
          <div key={pet.listingid} onClick={() => setSelectedPetId(pet.listingid.toString())} className="cursor-pointer">
            <PetCard pet={pet} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {visiblePets < filteredPets.length && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={loadMorePets}>
            Load More Pets
          </Button>
        </div>
      )}

      {/* Pet Details Modal */}
      {selectedPetId && (
        <PetDetailsModal
          petId={selectedPetId}
          isOpen={!!selectedPetId}
          onClose={() => setSelectedPetId(null)}
        />
      )}
    </div>
  );
}
