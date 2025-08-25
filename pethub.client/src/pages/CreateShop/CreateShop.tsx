
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera, Store, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateShop() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    email: '',
    category: '',
    address: '',
    website: ''
  });
  const [logo, setLogo] = useState<string>('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock shop creation
    alert('Shop created successfully! Redirecting to your shop dashboard...');
    navigate('/shop/dashboard');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Create Your Pet Shop</h1>
        <p className="text-muted-foreground">Set up your digital pet shop and start selling to thousands of pet lovers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shop Logo */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Branding</CardTitle>
            <CardDescription>Upload your shop logo and create your brand identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                {logo ? (
                  <img src={logo} alt="Shop logo" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Shop Logo</p>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="logo" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </span>
                  </Button>
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: 200x200px, PNG or JPG
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name *</Label>
                <Input
                  id="shopName"
                  placeholder="e.g. Happy Paws Pet Store"
                  value={shopData.name}
                  onChange={(e) => setShopData({...shopData, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Shop Category</Label>
                <Select onValueChange={(value) => setShopData({...shopData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Pet Store</SelectItem>
                    <SelectItem value="breeder">Professional Breeder</SelectItem>
                    <SelectItem value="rescue">Pet Rescue Center</SelectItem>
                    <SelectItem value="specialty">Specialty Pets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Shop Description *</Label>
              <Textarea
                id="description"
                placeholder="Tell customers about your shop, experience, and what makes you special..."
                value={shopData.description}
                onChange={(e) => setShopData({...shopData, description: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">City/Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. New York, NY"
                  value={shopData.location}
                  onChange={(e) => setShopData({...shopData, location: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +1 (555) 123-4567"
                  value={shopData.phone}
                  onChange={(e) => setShopData({...shopData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address (Optional)</Label>
              <Input
                id="address"
                placeholder="e.g. 123 Main Street, New York, NY 10001"
                value={shopData.address}
                onChange={(e) => setShopData({...shopData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. info@yourshop.com"
                  value={shopData.email}
                  onChange={(e) => setShopData({...shopData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="e.g. https://yourshop.com"
                  value={shopData.website}
                  onChange={(e) => setShopData({...shopData, website: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shop Features */}
        <Card>
          <CardHeader>
            <CardTitle>Shop Features</CardTitle>
            <CardDescription>What services and features does your shop offer?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Health Certificates',
                'Vaccinated Pets',
                'Delivery Available',
                'Grooming Services',
                'Training Support',
                'Vet Consultation'
              ].map((feature) => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <Store className="w-4 h-4 mr-2" />
            Create My Shop
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
