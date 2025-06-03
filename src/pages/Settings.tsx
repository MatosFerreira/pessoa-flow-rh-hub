
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Users,
  Settings as SettingsIcon,
  Bell,
  Shield
} from 'lucide-react';
import CompanySetup from '@/components/CompanySetup';
import UserInviteManager from '@/components/UserInviteManager';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações da sua empresa e da plataforma</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Pipeline</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* Configurações da Empresa */}
        <TabsContent value="company">
          <CompanySetup />
        </TabsContent>

        {/* Gestão de Usuários */}
        <TabsContent value="users">
          <UserInviteManager />
        </TabsContent>

        {/* Outras abas mantidas como estavam */}
        <TabsContent value="pipeline">
          <div className="text-center py-8">
            <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações do Pipeline</h3>
            <p className="text-gray-600">Em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações de Notificação</h3>
            <p className="text-gray-600">Em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Configurações de Segurança</h3>
            <p className="text-gray-600">Em desenvolvimento</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
