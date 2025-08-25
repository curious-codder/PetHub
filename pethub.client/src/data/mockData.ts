export const mockPets = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    price: 1200,
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    seller: {
      name: 'Happy Paws Pet Store',
      type: 'shop' as const,
      rating: 4.8
    },
    category: 'Dogs',
    status: 'available' as const,
    isLiked: false,
    postedDate: '2 days ago'
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Persian Cat',
    age: '1 year',
    price: 800,
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    seller: {
      name: 'Sarah Johnson',
      type: 'individual' as const,
      rating: 4.9
    },
    category: 'Cats',
    status: 'available' as const,
    isLiked: true,
    postedDate: '1 day ago'
  },
  {
    id: '3',
    name: 'Max',
    breed: 'German Shepherd',
    age: '3 years',
    price: 1500,
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop',
    seller: {
      name: 'Elite K9 Breeders',
      type: 'shop' as const,
      rating: 4.7
    },
    category: 'Dogs',
    status: 'pending' as const,
    isLiked: false,
    postedDate: '3 days ago'
  },
  {
    id: '4',
    name: 'Charlie',
    breed: 'Canary',
    age: '6 months',
    price: 150,
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1571752726703-5e7e21c7ec3e?w=400&h=300&fit=crop',
    seller: {
      name: 'Mike Thompson',
      type: 'individual' as const,
      rating: 4.5
    },
    category: 'Birds',
    status: 'available' as const,
    isLiked: false,
    postedDate: '4 days ago'
  },
  {
    id: '5',
    name: 'Bella',
    breed: 'Labrador',
    age: '1.5 years',
    price: 1000,
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    seller: {
      name: 'Texas Pet Paradise',
      type: 'shop' as const,
      rating: 4.6
    },
    category: 'Dogs',
    status: 'available' as const,
    isLiked: true,
    postedDate: '1 week ago'
  },
  {
    id: '6',
    name: 'Whiskers',
    breed: 'Maine Coon',
    age: '2 years',
    price: 1200,
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
    seller: {
      name: 'Emma Davis',
      type: 'individual' as const,
      rating: 4.8
    },
    category: 'Cats',
    status: 'available' as const,
    isLiked: false,
    postedDate: '5 days ago'
  },
  {
    id: '7',
    name: 'Nemo',
    breed: 'Goldfish',
    age: '3 months',
    price: 25,
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=300&fit=crop',
    seller: {
      name: 'Aquatic World',
      type: 'shop' as const,
      rating: 4.4
    },
    category: 'Fish',
    status: 'available' as const,
    isLiked: false,
    postedDate: '2 days ago'
  },
  {
    id: '8',
    name: 'Rex',
    breed: 'Bearded Dragon',
    age: '1 year',
    price: 300,
    location: 'Phoenix, AZ',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    seller: {
      name: 'Reptile Kingdom',
      type: 'shop' as const,
      rating: 4.3
    },
    category: 'Reptiles',
    status: 'available' as const,
    isLiked: false,
    postedDate: '6 days ago'
  }
];

export const mockCategories = [
  {
    id: 'dogs',
    name: 'Dogs',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop',
    count: 150
  },
  {
    id: 'cats',
    name: 'Cats',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop',
    count: 89
  },
  {
    id: 'birds',
    name: 'Birds',
    image: 'https://images.unsplash.com/photo-1571752726703-5e7e21c7ec3e?w=200&h=200&fit=crop',
    count: 45
  },
  {
    id: 'fish',
    name: 'Fish',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=200&h=200&fit=crop',
    count: 78
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
    count: 23
  },
  {
    id: 'small-pets',
    name: 'Small Pets',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop',
    count: 34
  }
];

export const mockShops = [
  {
    id: '1',
    name: 'Happy Paws Pet Store',
    logo: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=100&h=100&fit=crop',
    rating: 4.8,
    location: 'New York, NY',
    petCount: 25,
    description: 'Premium pet store with healthy and happy pets',
    specialties: ['Dogs', 'Cats', 'Birds']
  },
  {
    id: '2',
    name: 'Elite K9 Breeders',
    logo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100&h=100&fit=crop',
    rating: 4.7,
    location: 'Chicago, IL',
    petCount: 15,
    description: 'Specialized in purebred dogs with championship bloodlines',
    specialties: ['Dogs']
  },
  {
    id: '3',
    name: 'Texas Pet Paradise',
    logo: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=100&h=100&fit=crop',
    rating: 4.6,
    location: 'Austin, TX',
    petCount: 32,
    description: 'Your one-stop shop for all pet needs',
    specialties: ['Dogs', 'Cats', 'Birds', 'Fish']
  },
  {
    id: '4',
    name: 'Aquatic World',
    logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop',
    rating: 4.4,
    location: 'Denver, CO',
    petCount: 45,
    description: 'Specialists in aquatic pets and marine life',
    specialties: ['Fish', 'Reptiles']
  }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Jessica Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332666c?w=50&h=50&fit=crop',
    rating: 5,
    text: "Found my perfect companion through PawSphere! The process was smooth and the seller was very responsive.",
    petName: 'Golden Retriever',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    rating: 5,
    text: "As a breeder, PawSphere has helped me connect with genuine pet lovers. Great platform!",
    petName: 'Persian Cat',
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Sarah Martinez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    rating: 4,
    text: "Love the messaging system! Made it easy to ask questions before making a decision.",
    petName: 'Labrador',
    date: '3 weeks ago'
  }
];