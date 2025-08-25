
import { Link } from 'react-router-dom';
import { PetGrid } from '@/components/pets/PetGrid';
import { mockPets } from '@/data/mockData';
import { transformMockPetsToPets } from '@/utils/dataTransformers';
import { useToast } from '@/hooks/use-toast';

export function FeaturedPets() {
  const { toast } = useToast();
  
  // Get featured pets (first 8 pets) and transform them
  const featuredPets = transformMockPetsToPets(mockPets.slice(0, 8));

  const handleLike = (petId: string | number) => {
    toast({
      title: "Pet liked!",
      description: "Added to your favorites list.",
    });
  };

  const handleContact = (petId: string | number) => {
    toast({
      title: "Contact seller",
      description: "Opening messaging interface...",
    });
  };

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Pets
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing pets from trusted sellers and breeders
          </p>
        </div>

        <PetGrid 
          pets={featuredPets}
          onLike={handleLike}
          onContact={handleContact}
        />

        <div className="text-center mt-12">
          <Link to="/pets">
            <button className="btn-primary">
              View All Pets
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
