import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Store, Plus, TrendingUp, Users, MessageCircle, Settings, Upload } from 'lucide-react';
import { mockPets } from '@/data/mockData';

export default function ShopDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const shopPets = mockPets.slice(0, 6);
  const shopStats = {
    totalSales: 24500,
    activePets: 18,
    totalViews: 3240,
    inquiries: 12
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shop Dashboard</h1>
          <p className="text-muted-foreground">Manage your pet shop and inventory</p>
        </div>
        <div className="flex gap-4">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Pet
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Shop Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="shop-settings">Shop</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-bold">${shopStats.totalSales.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Pets</p>
                    <p className="text-2xl font-bold">{shopStats.activePets}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Shop Views</p>
                    <p className="text-2xl font-bold">{shopStats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Inquiries</p>
                    <p className="text-2xl font-bold">{shopStats.inquiries}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New inquiry for Golden Retriever</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Persian Cat listing viewed 15 times</p>
                      <p className="text-sm text-muted-foreground">4 hours ago</p>
                    </div>
                    <Badge variant="secondary">Views</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Parrot sold successfully</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                    <Badge variant="secondary">Sold</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    Add Pet
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageCircle className="w-6 h-6 mb-2" />
                    Messages
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="w-6 h-6 mb-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pet Inventory</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Pet
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopPets.map((pet) => (
              <Card key={pet.id}>
                <CardContent className="p-4">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{pet.name}</h3>
                      <Badge variant={pet.status === 'available' ? 'default' : 'secondary'}>
                        {pet.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{pet.breed}</p>
                    <p className="text-lg font-bold text-primary">${pet.price}</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm">Edit</Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">No recent orders to display</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-xl font-semibold">Shop Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics charts would go here...</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular Pets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Popular pets list would go here...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shop-settings" className="space-y-6">
          <h2 className="text-xl font-semibold">Shop Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
              <CardDescription>Update your shop details and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name</Label>
                  <Input id="shopName" placeholder="Happy Pets Store" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopLocation">Location</Label>
                  <Input id="shopLocation" placeholder="New York, NY" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopDescription">Description</Label>
                <Textarea 
                  id="shopDescription" 
                  placeholder="Tell customers about your shop..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopLogo">Shop Logo</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <span className="text-sm text-muted-foreground">JPG, PNG up to 2MB</span>
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}