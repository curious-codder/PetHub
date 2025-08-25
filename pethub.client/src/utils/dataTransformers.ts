
interface MockPet {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  location: string;
  image: string;
  category: string;
  status: string;
  seller?: any;
  isLiked?: boolean;
  postedDate?: string;
}

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

export function transformMockPetToPet(mockPet: MockPet): Pet {
  return {
    listingid: mockPet.id,
    petname: mockPet.name,
    breedname: mockPet.breed,
    age: mockPet.age,
    price: mockPet.price,
    location: mockPet.location,
    imageurl: mockPet.image,
    status: mockPet.status === 'available' ? 'Available' : 'Sold',
    categoryname: mockPet.category,
    postedDate: mockPet.postedDate
  };
}

export function transformMockPetsToPets(mockPets: MockPet[]): Pet[] {
  return mockPets.map(transformMockPetToPet);
}
