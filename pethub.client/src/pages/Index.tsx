import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedPets } from '@/components/home/FeaturedPets';
import { FeaturedShops } from '@/components/home/FeaturedShops';
import { Testimonials } from '@/components/home/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedPets />
      <FeaturedShops />
      <Testimonials />
    </div>
  );
};

export default Index;
