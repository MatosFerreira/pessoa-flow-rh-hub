
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  GitBranch, 
  Calendar, 
  Settings, 
  LogOut,
  Building2,
  Briefcase
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Vagas', href: '/vagas', icon: Briefcase },
    { name: 'Candidatos', href: '/candidatos', icon: Users },
    { name: 'Pipeline', href: '/pipeline', icon: GitBranch },
    { name: 'Entrevistas', href: '/entrevistas', icon: Calendar },
    { name: 'Colaboradores', href: '/colaboradores', icon: UserCheck },
    { name: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Plataforma</h1>
              <p className="text-sm text-primary font-medium">Pessoas</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Company Info */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Building2 className="h-5 w-5 text-gray-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.companyName}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role === 'admin' ? 'Administrador' :
                 user?.role === 'hr' ? 'RH' :
                 user?.role === 'manager' ? 'Gestor' : 'Colaborador'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={logout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
