
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, Menu, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserMenu } from '@/components/navigation/UserMenu';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isSignedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/pets?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const likedCount = 3; // Mock data

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with improved spacing */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-primary">
              <span className="text-primary font-bold text-lg">PH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PetHub</span>
          </Link>

          {/* Desktop Navigation with better spacing */}
          <nav className="hidden md:flex space-x-8 ml-12">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/pets" className="text-gray-700 hover:text-primary transition-colors">
              Browse Pets
            </Link>
            <Link to="/shops" className="text-gray-700 hover:text-primary transition-colors">
              Pet Shops
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </form>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {isSignedIn && user ? (
              <>
                {/* Post Pet Button */}
                <Button asChild className="hidden md:flex">
                  <Link to="/post-pet">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Pet
                  </Link>
                </Button>

                {/* Favorites - Fixed link */}
                <Link to="/favorites" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
                  <Heart className="h-6 w-6" />
                  {likedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {likedCount}
                    </span>
                  )}
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <NotificationDropdown />
                </div>

                {/* User Menu */}
                <UserMenu />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for pets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </form>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/pets"
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Pets
                </Link>
                <Link
                  to="/shops"
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pet Shops
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Mobile Post Pet Button */}
              {isSignedIn && user && (
                <Button asChild className="w-full">
                  <Link to="/post-pet" onClick={() => setIsMenuOpen(false)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Pet
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
