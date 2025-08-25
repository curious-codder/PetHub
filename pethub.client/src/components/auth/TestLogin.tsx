
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { apiService } from '@/services/apiService';
import { BackendConnectionTest } from '@/components/debug/BackendConnectionTest';

interface TestUser {
  id: number;
  name: string;
  email: string;
  type: string;
  password: string;
}

export function TestLogin() {
  const { testSignIn, loading } = useAuth();
  const [users, setUsers] = useState<TestUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showConnectionTest, setShowConnectionTest] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await apiService.getTestUsers();
        
        if (response.success && response.users) {
          const formattedUsers = response.users.map((user: any) => ({
            id: user.userId,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            type: user.userType,
            password: user.testPassword || 'test123'
          }));
          
          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error('Error loading test users:', error);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  const handleTestLogin = async (userId: number, userName: string) => {
    try {
      await testSignIn(userId);
      toast.success(`Signed in as ${userName}`);
    } catch (error) {
      console.error('Test login error:', error);
      toast.error('Failed to sign in - please check backend connection');
    }
  };

  if (loadingUsers) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="text-center">Loading test users...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Login</CardTitle>
          <CardDescription>
            Click any button below to sign in as a sample user (connects to backend API)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <Button
                key={user.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleTestLogin(user.id, user.name)}
                disabled={loading}
              >
                <div className="text-left w-full">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email} • {user.type}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Password: {user.password}
                  </div>
                </div>
              </Button>
            ))
          ) : (
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                No test users available from backend.
              </div>
              <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                <strong>Note:</strong> Please ensure your ASP.NET backend is running and accessible.
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowConnectionTest(!showConnectionTest)}
                className="w-full"
              >
                {showConnectionTest ? 'Hide' : 'Show'} Connection Test
              </Button>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Backend API Integration:</p>
            <div className="text-xs text-blue-700 mt-1">
              All authentication now handled by ASP.NET backend
            </div>
          </div>
        </CardContent>
      </Card>

      {showConnectionTest && <BackendConnectionTest />}
    </div>
  );
}
