import { Link } from 'react-router-dom';
import { mockCategories } from '@/data/mockData';

export function Categories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Pet Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing pets from various categories. Find your perfect companion today!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              to={`/pets?category=${category.id}`}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-medium transition-all duration-300 group-hover:scale-105">
                <div className="relative mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {category.count}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} available</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/pets">
            <button className="btn-primary">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}