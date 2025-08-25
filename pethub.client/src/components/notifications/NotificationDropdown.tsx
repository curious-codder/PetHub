
import { useState } from 'react';
import { Bell, MessageCircle, Heart, Store, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'shop' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  actionUrl?: string;
  petId?: string;
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about Golden Retriever',
      time: '2 min ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60',
      actionUrl: '/chat/1',
      petId: '1'
    },
    {
      id: '2',
      type: 'like',
      title: 'New Like',
      message: 'Someone liked your Labrador puppy listing',
      time: '1 hour ago',
      isRead: false,
      actionUrl: '/pet/123'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Mike Wilson is interested in your cat',
      time: '3 hours ago',
      isRead: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60',
      actionUrl: '/chat/2',
      petId: '2'
    },
    {
      id: '4',
      type: 'shop',
      title: 'New Shop Update',
      message: '3 new pets available at Happy Paws Pet Store',
      time: '1 day ago',
      isRead: true,
      actionUrl: '/shop/1'
    },
    {
      id: '5',
      type: 'system',
      title: 'Welcome!',
      message: 'Welcome to PetHub! Start exploring amazing pets.',
      time: '2 days ago',
      isRead: true
    }
  ]);

  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.type === 'message' && notification.petId) {
      navigate(`/chat/${notification.petId}`);
    } else if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case 'like': return <Heart className="w-4 h-4 text-red-600" />;
      case 'shop': return <Store className="w-4 h-4 text-green-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        
        <div className="space-y-1">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className={`cursor-pointer transition-colors border-0 shadow-none ${
                !notification.isRead ? 'bg-primary/5' : 'hover:bg-muted/50'
              }`}>
                <CardContent className="p-3" onClick={() => handleNotificationClick(notification)}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>{notification.title?.[0] || 'N'}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {notification.title && (
                            <p className="text-sm font-medium truncate">{notification.title}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/notifications">View All Notifications</Link>
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
