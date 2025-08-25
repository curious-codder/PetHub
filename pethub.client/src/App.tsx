
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Index';
import Pets from '@/pages/Browse/BrowsePets';
import PetDetail from '@/pages/PetDetails/PetDetails';
import Shops from '@/pages/Browse/ShopList';
import About from '@/pages/About/About';
import Contact from '@/pages/Contact/Contact';
import PostPet from '@/pages/PostPet/PostPet';
import CreateShop from '@/pages/CreateShop/CreateShop';
import UserDashboard from '@/pages/Dashboard/UserDashboard';
import MyPosts from '@/pages/MyPosts/MyPosts';
import EditPet from '@/pages/EditPet/EditPet';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import ChatInterface from '@/pages/Chat/ChatInterface';
import ShopDetails from '@/pages/Shop/ShopDetails';
import Profile from '@/pages/Profile/Profile';
import Favorites from '@/pages/Favorites/Favorites';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pet/:petId" element={<PetDetail />} />
            <Route path="/shops" element={<Shops />} />
            <Route path="/shop/:id" element={<ShopDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/post-pet" element={<PostPet />} />
            <Route path="/create-shop" element={<CreateShop />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/edit-pet/:petId" element={<EditPet />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chat/:id" element={<ChatInterface />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
