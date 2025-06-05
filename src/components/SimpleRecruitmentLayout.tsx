
import React from 'react';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Users, 
  GitBranch, 
  Calendar, 
  LogOut,
  Building2,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  UserCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SimpleRecruitmentLayoutProps {
  children: React.ReactNode;
}

const SimpleRecruitmentLayout: React.FC<SimpleRecruitmentLayoutProps> = ({ children }) => {
  const { user, logout, hasPermission } = useSimpleAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, description: 'Visão geral do recrutamento', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Vagas', href: '/vagas', icon: Briefcase, description: 'Gestão de vagas e oportunidades', roles: ['admin', 'hr', 'manager'] },
    { name: 'Candidatos', href: '/candidatos', icon: Users, description: 'Base de candidatos e currículos', roles: ['admin', 'hr', 'manager'] },
    { name: 'Pipeline', href: '/pipeline', icon: GitBranch, description: 'Funil de seleção Kanban', roles: ['admin', 'hr', 'manager'] },
    { name: 'Entrevistas', href: '/entrevistas', icon: Calendar, description: 'Agendamentos e histórico', roles: ['admin', 'hr', 'manager'] },
    { name: 'Colaboradores', href: '/colaboradores', icon: UserCheck, description: 'Gestão de colaboradores', roles: ['admin', 'hr', 'manager'] },
    { name: 'Relatórios', href: '/relatorios', icon: BarChart3, description: 'Métricas e indicadores', roles: ['admin', 'hr', 'manager'] },
    { name: 'Configurações', href: '/configuracoes', icon: Settings, description: 'Configurações da empresa', roles: ['admin'] },
  ];

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Administrador',
      manager: 'Gestor',
      hr: 'RH',
      employee: 'Colaborador'
    };
    return labels[role as keyof typeof labels] || role;
  };

  const visibleNavItems = navItems.filter(item => hasPermission(item.roles));

  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar - Módulo Recrutamento */}
      <div className="w-72 bg-white shadow-xl border-r border-gray-100 flex flex-col">
        {/* Logo e Módulo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Plataforma</h1>
              <p className="text-sm text-primary font-medium">Pessoas</p>
            </div>
          </div>
          
          {/* Módulo Atual */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sistema Simplificado</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Login com controle de acesso</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-start space-x-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]",
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className={cn(
                    "text-xs opacity-80 mt-0.5",
                    isActive ? "text-white/80" : "text-gray-500"
                  )}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Ações Rápidas</h3>
            <div className="space-y-2">
              {hasPermission(['admin', 'hr', 'manager']) && (
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Nova Vaga
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Building2 className="h-5 w-5 text-gray-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.nome || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500">
                {getRoleLabel(user?.role || 'employee')}
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
                {visibleNavItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600">
                {visibleNavItems.find(item => item.href === location.pathname)?.description}
              </p>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {user?.nome?.split(' ').map(n => n[0]).join('').toUpperCase() || user?.username?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.nome || user?.username}</p>
                  <p className="text-xs text-gray-500">{getRoleLabel(user?.role || 'employee')}</p>
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

export default SimpleRecruitmentLayout;
