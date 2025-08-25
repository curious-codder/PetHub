
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Shield, Award, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Happy Pet Owners', value: '10,000+', icon: Heart },
    { label: 'Registered Shops', value: '500+', icon: Users },
    { label: 'Successful Adoptions', value: '8,500+', icon: Award },
    { label: 'Cities Covered', value: '50+', icon: MapPin }
  ];

  const features = [
    {
      title: 'Safe & Secure',
      description: 'All pet listings are verified and sellers are authenticated for your safety.',
      icon: Shield
    },
    {
      title: 'Easy Communication',
      description: 'Direct chat with sellers and instant WhatsApp integration for quick contact.',
      icon: Phone
    },
    {
      title: 'Trusted Community',
      description: 'Join thousands of pet lovers in our growing community.',
      icon: Users
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About PetHub</h1>
          <p className="text-xl text-muted-foreground">
            Connecting pet lovers with their perfect companions since 2023
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At PetHub, we believe every pet deserves a loving home and every family deserves the perfect companion. 
              Our platform bridges the gap between responsible pet sellers and caring pet owners.
            </p>
            <p className="text-muted-foreground mb-4">
              We provide a safe, user-friendly marketplace where you can find healthy, well-cared-for pets from 
              verified sellers and professional pet shops.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>Trusted</Badge>
              <Badge>Secure</Badge>
              <Badge>Community-Driven</Badge>
              <Badge>Pet-Focused</Badge>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=60"
              alt="Happy pets"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose PetHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Mail className="w-6 h-6 text-primary mb-2" />
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">support@pethub.com</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="w-6 h-6 text-primary mb-2" />
                <p className="font-semibold">Phone</p>
                <p className="text-muted-foreground">+1 (555) 123-PETS</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <p className="font-semibold">Address</p>
                <p className="text-muted-foreground">123 Pet Street, Animal City</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
