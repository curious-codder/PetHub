
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { config } from '@/config/environment';
import { apiService } from '@/services/apiService';

export function BackendConnectionTest() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const testConnection = async () => {
    setTestStatus('testing');
    setErrorMessage('');

    try {
      // Test basic connectivity
      const response = await fetch(`${config.apiUrl}/health`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setTestStatus('success');
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Connection test failed:', error);
      setTestStatus('error');
      
      if (error.message.includes('fetch')) {
        setErrorMessage('Cannot connect to backend server. Please ensure your ASP.NET API is running.');
      } else {
        setErrorMessage(error.message || 'Unknown connection error');
      }
    }
  };

  const testAuth = async () => {
    try {
      setTestStatus('testing');
      const users = await apiService.getTestUsers();
      console.log('Test users loaded successfully:', users);
      setTestStatus('success');
    } catch (error: any) {
      console.error('Auth test failed:', error);
      setTestStatus('error');
      setErrorMessage(error.message || 'Authentication test failed');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Backend Connection Test
          {testStatus === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {testStatus === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
          {testStatus === 'testing' && <Loader2 className="w-5 h-5 animate-spin" />}
        </CardTitle>
        <CardDescription>
          Test connection to ASP.NET backend at: {config.apiUrl}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button 
            onClick={testConnection} 
            disabled={testStatus === 'testing'}
            className="w-full"
          >
            {testStatus === 'testing' ? 'Testing...' : 'Test Basic Connection'}
          </Button>
          
          <Button 
            onClick={testAuth} 
            disabled={testStatus === 'testing'}
            variant="outline"
            className="w-full"
          >
            {testStatus === 'testing' ? 'Testing...' : 'Test Auth Endpoints'}
          </Button>
        </div>

        {testStatus === 'error' && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {testStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Backend connection successful!</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Backend Setup Required:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>ASP.NET API running on https://localhost:7000</li>
            <li>CORS enabled for this frontend domain</li>
            <li>Health check endpoint: /api/health</li>
            <li>Auth endpoints: /api/auth/signin, /api/auth/signup, /api/auth/test-users</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
