
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackToListing() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back to the pets listing page
    navigate('/pets');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBackClick}
      className="mb-4 text-gray-600 hover:text-gray-800"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Listings
    </Button>
  );
}
