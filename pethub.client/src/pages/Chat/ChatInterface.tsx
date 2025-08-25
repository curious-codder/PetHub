
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Phone, Video, MoreHorizontal, ArrowLeft, Paperclip, Image, Bell } from 'lucide-react';
import { mockPets } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function ChatInterface() {
  const { id: petId } = useParams();
  const [message, setMessage] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hi! I saw your listing for the Golden Retriever puppy. Is he still available?',
      time: '2:30 PM',
      isSent: false,
      isRead: true
    },
    {
      id: 2,
      sender: 'You',
      content: 'Yes, he is still available! His name is Buddy and he\'s 8 weeks old.',
      time: '2:32 PM',
      isSent: true,
      isRead: true
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      content: 'That\'s wonderful! Can you tell me more about his vaccination status and health records?',
      time: '2:35 PM',
      isSent: false,
      isRead: true
    },
    {
      id: 4,
      sender: 'You',
      content: 'Of course! He has received his first set of vaccinations and comes with complete health records. I can send you the documents if you\'d like.',
      time: '2:37 PM',
      isSent: true,
      isRead: true
    },
    {
      id: 5,
      sender: 'Sarah Johnson',
      content: 'That would be great! Also, would it be possible to arrange a visit to meet him?',
      time: '2:40 PM',
      isSent: false,
      isRead: false
    }
  ]);

  // Find the pet based on the ID from URL
  const pet = mockPets.find(p => p.id.toString() === petId) || mockPets[0];

  const contact = {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60',
    status: 'online',
    petInquiry: `${pet.breed} - ${pet.name}`,
    lastSeen: 'Active now'
  };

  useEffect(() => {
    // Check for unread messages
    const unreadCount = messages.filter(msg => !msg.isSent && !msg.isRead).length;
    setHasNewMessage(unreadCount > 0);

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Show notification for new messages
    if (unreadCount > 0 && Notification.permission === 'granted') {
      new Notification(`New message from ${contact.name}`, {
        body: messages.filter(msg => !msg.isSent && !msg.isRead)[0]?.content || 'New message received',
        icon: contact.avatar
      });
    }
  }, [messages, contact.name, contact.avatar]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true,
        isRead: false
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate auto-reply
        const autoReply = {
          id: messages.length + 2,
          sender: contact.name,
          content: 'Thanks for the quick response! I\'ll get back to you soon.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSent: false,
          isRead: false
        };
        setMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleWhatsApp = () => {
    const lastMessage = messages[messages.length - 1]?.content || 'Hello!';
    window.open(`https://wa.me/15551234567?text=${encodeURIComponent(lastMessage)}`, '_blank');
  };

  const markAsRead = () => {
    setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
    setHasNewMessage(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        {hasNewMessage && (
          <Button size="sm" onClick={markAsRead}>
            <Bell className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Chat Header */}
        <CardHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {contact.petInquiry}
                  </Badge>
                  <span className="text-xs text-green-600">{contact.lastSeen}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleWhatsApp}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.06 18.34c-1.4 0-2.78-.38-3.99-1.11l-.29-.17-2.99.78.8-2.91-.18-.3c-.8-1.27-1.22-2.74-1.22-4.25 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m4.38-5.93c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.48-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28"/>
                </svg>
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.isSent ? 'order-2' : 'order-1'}`}>
                {!msg.isSent && (
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="text-xs">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{msg.sender}</span>
                    {!msg.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                )}
                <div className={`rounded-lg px-4 py-2 ${
                  msg.isSent 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted text-muted-foreground mr-auto'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${
                      msg.isSent ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                    }`}>
                      {msg.time}
                    </p>
                    {msg.isSent && (
                      <span className="text-xs text-primary-foreground/70">
                        {msg.isRead ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="text-xs">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button type="button" size="sm" variant="outline">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button type="button" size="sm" variant="outline">
              <Image className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Pet Info Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">About this inquiry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <img 
              src={pet.image}
              alt={pet.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-semibold">{pet.name} - {pet.breed}</h4>
              <p className="text-sm text-muted-foreground">{pet.age} • $${pet.price}</p>
              <Badge variant="outline" className="mt-1">{pet.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
