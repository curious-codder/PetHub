
import { PetCard } from './PetCard';

interface Pet {
  listingid: string | number;
  petname: string;
  breedname?: string;
  age: string;
  price: number;
  location: string;
  imageurl: string;
  status: 'Available' | 'Sold' | 'Pending';
  categoryname?: string;
  postedDate?: string;
}

interface PetGridProps {
  pets: Pet[];
  onLike?: (petId: string | number) => void;
  onContact?: (petId: string | number) => void;
}

export function PetGrid({ pets, onLike, onContact }: PetGridProps) {
  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pets available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <PetCard 
          key={pet.listingid}
          pet={pet}
          onLike={onLike}
          onContact={onContact}
        />
      ))}
    </div>
  );
}
