
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User, Settings, Store, Plus, FileText, LayoutDashboard, LogOut, LogIn, UserPlus, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { TestLogin } from '@/components/auth/TestLogin';

export function UserMenu() {
  const navigate = useNavigate();
  const { user, isSignedIn, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  if (!isSignedIn || !user) {
    return (
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Test Login
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <TestLogin />
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="sm" onClick={handleSignIn}>
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/signup">
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        
        {/* Dashboard */}
        <DropdownMenuItem asChild>
          <Link to="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* Favorites */}
        <DropdownMenuItem asChild>
          <Link to="/favorites">
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Quick Actions */}
        <DropdownMenuItem asChild>
          <Link to="/post-pet">
            <Plus className="mr-2 h-4 w-4" />
            <span>Post Pet</span>
          </Link>
        </DropdownMenuItem>

        {user.userType === 'individual' && (
          <DropdownMenuItem asChild>
            <Link to="/create-shop">
              <Store className="mr-2 h-4 w-4" />
              <span>Create Shop</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* My Content */}
        <DropdownMenuItem asChild>
          <Link to="/my-posts">
            <FileText className="mr-2 h-4 w-4" />
            <span>My Posts</span>
          </Link>
        </DropdownMenuItem>

        {user.userType === 'shop' && (
          <DropdownMenuItem asChild>
            <Link to="/my-shop">
              <Store className="mr-2 h-4 w-4" />
              <span>My Shop</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Settings */}
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
