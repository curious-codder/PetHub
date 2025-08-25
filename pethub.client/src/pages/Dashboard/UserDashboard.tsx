import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Heart, MessageCircle, Plus, Settings, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { mockPets } from '@/data/mockData';
import { BackToListing } from '@/components/navigation/BackToListing';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('my-pets');
  const [myPets, setMyPets] = useState(mockPets.slice(0, 3).map(pet => ({
    ...pet,
    likesCount: Math.floor(Math.random() * 50) + 5,
    viewsCount: Math.floor(Math.random() * 200) + 20
  })));
  const navigate = useNavigate();
  const { toast } = useToast();

  const likedPets = mockPets.slice(3, 6);
  const messages = [
    { id: 1, petName: 'Golden Retriever Puppy', sender: 'John Doe', message: 'Is this puppy still available?', time: '2 hours ago' },
    { id: 2, petName: 'Persian Cat', sender: 'Jane Smith', message: 'Can I schedule a visit?', time: '1 day ago' },
    { id: 3, petName: 'Parrot', sender: 'Mike Johnson', message: 'What is the age of this bird?', time: '2 days ago' },
  ];

  const handlePostNewPet = () => {
    navigate('/post-pet');
  };

  const handleSettings = () => {
    navigate('/profile');
  };

  const handleViewPet = (petId: string) => {
    navigate(`/pet/${petId}`);
  };

  const handleEditPet = (petId: string) => {
    navigate(`/edit-pet/${petId}`);
  };

  const handleDeletePet = (petId: string) => {
    setMyPets(myPets.filter(pet => pet.id !== petId));
    toast({
      title: "Pet Deleted",
      description: "Your pet listing has been deleted successfully",
      variant: "destructive"
    });
  };

  const handleReplyMessage = (messageId: number) => {
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    });
    console.log('Reply to message:', messageId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <BackToListing />
          </div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your pet listings and account</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handlePostNewPet}>
            <Plus className="w-4 h-4 mr-2" />
            Post New Pet
          </Button>
          <Button variant="outline" onClick={handleSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold">{myPets.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{myPets.reduce((sum, pet) => sum + pet.viewsCount, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">{myPets.reduce((sum, pet) => sum + pet.likesCount, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-pets">My Pets</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="my-pets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Pet Listings</h2>
            <Button onClick={handlePostNewPet}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Pet
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPets.map((pet) => (
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
                      <Badge variant="default">
                        available
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{pet.breed}</p>
                    <p className="text-lg font-bold text-primary">${pet.price}</p>
                    
                    {/* Likes and Views Stats */}
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{pet.likesCount} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{pet.viewsCount} views</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewPet(pet.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditPet(pet.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <h2 className="text-xl font-semibold">Favorite Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedPets.map((pet) => (
              <Card key={pet.id}>
                <CardContent className="p-4">
                  <img 
                    src={pet.image} 
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="space-y-2">
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-muted-foreground text-sm">{pet.breed}</p>
                    <p className="text-lg font-bold text-primary">${pet.price}</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm">Contact Seller</Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
                        Liked
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{message.petName}</h3>
                      <p className="text-sm text-muted-foreground">From: {message.sender}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm mb-3">{message.message}</p>
                  <Button size="sm" onClick={() => handleReplyMessage(message.id)}>
                    Reply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSettings}>Go to Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
