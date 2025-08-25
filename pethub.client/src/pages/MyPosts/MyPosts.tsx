
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Trash2, Eye, MessageCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { useAuth } from '@/hooks/useAuth';

interface PetListing {
  listingid: number;
  petname: string;
  breedname?: string;
  price: number;
  status: 'Available' | 'Pending' | 'Sold' | 'Inactive';
  viewcount: number;
  createdat: string;
  imageurl?: string;
}

export default function MyPosts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [myPosts, setMyPosts] = useState<PetListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.userid) {
      loadMyPosts();
    }
  }, [user]);

  const loadMyPosts = async () => {
    try {
      setLoading(true);
      const posts = await apiService.getUserPetListings(user!.userid);
      setMyPosts(posts);
    } catch (error) {
      console.error('Failed to load user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = myPosts.filter(post => {
    const matchesSearch = post.petname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.breedname && post.breedname.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || post.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: myPosts.length,
    available: myPosts.filter(p => p.status === 'Available').length,
    pending: myPosts.filter(p => p.status === 'Pending').length,
    sold: myPosts.filter(p => p.status === 'Sold').length,
    totalViews: myPosts.reduce((sum, p) => sum + (p.viewcount || 0), 0),
    totalInquiries: Math.floor(Math.random() * 100) // This would come from messages/inquiries count
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'default';
      case 'pending': return 'secondary';
      case 'sold': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Pet Listings</h1>
          <p className="text-muted-foreground">Manage and track your pet posts</p>
        </div>
        <Button asChild>
          <Link to="/post-pet">
            <Plus className="w-4 h-4 mr-2" />
            Post New Pet
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.sold}</div>
            <div className="text-sm text-muted-foreground">Sold</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.totalInquiries}</div>
            <div className="text-sm text-muted-foreground">Inquiries</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search your posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.listingid} className="overflow-hidden">
            <div className="relative">
              <img 
                src={post.imageurl || '/placeholder.svg'} 
                alt={post.petname}
                className="w-full h-48 object-cover"
              />
              <Badge 
                variant={getStatusColor(post.status)} 
                className="absolute top-2 right-2"
              >
                {post.status}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{post.petname}</CardTitle>
                  <p className="text-sm text-muted-foreground">{post.breedname || 'Mixed Breed'}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">${post.price}</p>
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(post.createdat).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span>{post.viewcount || 0} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span>0 inquiries</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/pet/${post.listingid}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/edit-pet/${post.listingid}`}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== 'all' ? 'No posts match your filters' : 'No posts yet'}
          </div>
          <Button asChild>
            <Link to="/post-pet">
              <Plus className="w-4 h-4 mr-2" />
              Post Your First Pet
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
