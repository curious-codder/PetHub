
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/apiService';
import { useAuth } from '@/hooks/useAuth';

interface Category {
  categoryId: number;
  categoryName: string;
}

const petSchema = z.object({
  petName: z.string().min(1, 'Pet name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.enum(['Male', 'Female', 'Unknown']),
  size: z.enum(['Small', 'Medium', 'Large', 'Extra Large']),
  color: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  healthStatus: z.string().optional(),
  vaccinationStatus: z.string().optional(),
  isNeutered: z.boolean().optional(),
  specialNeeds: z.string().optional(),
  isNegotiable: z.boolean().default(false),
});

type PetFormData = z.infer<typeof petSchema>;

export default function EditPet() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      gender: 'Unknown',
      size: 'Medium',
      isNeutered: false,
      isNegotiable: false,
    },
  });

  useEffect(() => {
    loadCategories();
    if (petId) {
      loadPetData();
    }
  }, [petId]);

  const loadCategories = async () => {
    try {
      const response = await apiService.getCategories();
      if (response.success) {
        setCategories(response.categories || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive',
      });
    }
  };

  const loadPetData = async () => {
    if (!petId || !user?.dbUser) return;

    try {
      const response = await apiService.getPetById(parseInt(petId));
      
      if (response.success && response.pet) {
        const pet = response.pet;
        
        // Helper function to safely cast gender
        const getValidGender = (gender: string | null): 'Male' | 'Female' | 'Unknown' => {
          if (gender === 'Male' || gender === 'Female' || gender === 'Unknown') {
            return gender;
          }
          return 'Unknown';
        };

        // Helper function to safely cast size
        const getValidSize = (size: string | null): 'Small' | 'Medium' | 'Large' | 'Extra Large' => {
          if (size === 'Small' || size === 'Medium' || size === 'Large' || size === 'Extra Large') {
            return size;
          }
          return 'Medium';
        };

        form.reset({
          petName: pet.petName,
          breed: pet.breed || '',
          age: pet.age || '',
          gender: getValidGender(pet.gender),
          size: getValidSize(pet.size),
          color: pet.color || '',
          price: pet.price.toString(),
          location: pet.location || '',
          description: pet.description || '',
          healthStatus: pet.healthStatus || '',
          vaccinationStatus: pet.vaccinationStatus || '',
          isNeutered: pet.isNeutered || false,
          specialNeeds: pet.specialNeeds || '',
          isNegotiable: pet.isNegotiable || false,
        });
        setSelectedCategory(pet.categoryId.toString());
      }
    } catch (error) {
      console.error('Error loading pet data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pet data',
        variant: 'destructive',
      });
      navigate('/my-posts');
    }
  };

  const onSubmit = async (data: PetFormData) => {
    if (!petId || !user?.dbUser || !selectedCategory) {
      toast({
        title: 'Error',
        description: 'Missing required information',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const petData = {
        petName: data.petName,
        categoryId: parseInt(selectedCategory),
        age: data.age,
        gender: data.gender,
        size: data.size,
        color: data.color,
        price: parseFloat(data.price),
        location: data.location,
        description: data.description,
        healthStatus: data.healthStatus,
        vaccinationStatus: data.vaccinationStatus,
        isNeutered: data.isNeutered,
        specialNeeds: data.specialNeeds,
        isNegotiable: data.isNegotiable,
      };

      const response = await apiService.updatePetListing(parseInt(petId), petData);

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Pet listing updated successfully!',
        });
        navigate('/my-posts');
      } else {
        throw new Error(response.message || 'Failed to update pet listing');
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      toast({
        title: 'Error',
        description: 'Failed to update pet listing',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Please sign in to edit your pet listings.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Pet Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Pet Name */}
              <FormField
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pet's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.categoryId} value={category.categoryId.toString()}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Breed and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter breed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 years, 6 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Gender and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Small">Small</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Large">Large</SelectItem>
                          <SelectItem value="Extra Large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Color and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about this pet..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Update Pet Listing'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
