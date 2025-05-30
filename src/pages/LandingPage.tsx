
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, GitBranch, BarChart3, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    "Recrutamento e Seleção Integrados",
    "Pipeline Kanban de Candidatos", 
    "Cadastro de Colaboradores",
    "Dashboards com Métricas",
    "Gestão Multiempresa",
    "Automação de Processos"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-light">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plataforma</h1>
              <p className="text-primary font-medium">Pessoas</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#recursos" className="text-gray-600 hover:text-primary transition-colors">Recursos</a>
            <a href="#sobre" className="text-gray-600 hover:text-primary transition-colors">Sobre</a>
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gerencie o RH da sua empresa com mais{' '}
                <span className="text-primary">agilidade</span>,{' '}
                <span className="text-primary">automação</span> e{' '}
                <span className="text-primary">segurança</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plataforma completa para recrutamento, seleção e gestão de colaboradores. 
                Simplifique seus processos de RH e tome decisões baseadas em dados.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Comece agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 hover:border-primary hover:text-primary px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
                >
                  Já tenho conta - Login
                </Button>
              </Link>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl p-8 lg:p-12">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Profissional diversa usando tablet para gestão de RH"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-gray-900">+47% Eficiência</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">500+ Empresas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para o RH da sua empresa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma completa que centraliza e otimiza todos os processos de recursos humanos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Briefcase className="h-8 w-8" />,
                title: "Gestão de Vagas",
                description: "Crie, publique e gerencie vagas com facilidade"
              },
              {
                icon: <GitBranch className="h-8 w-8" />,
                title: "Pipeline Visual",
                description: "Kanban intuitivo para acompanhar candidatos"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Banco de Talentos",
                description: "Centralize e organize todos os candidatos"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Analytics Avançado",
                description: "Dashboards e métricas para tomada de decisão"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Pronto para transformar o RH da sua empresa?
            </h2>
            <p className="text-xl text-white/90">
              Junte-se a centenas de empresas que já revolucionaram seus processos de RH
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Começar gratuitamente
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
                >
                  Fazer login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">Plataforma Pessoas</span>
              </div>
            </div>
            <p className="text-gray-400">
              © 2024 Plataforma Pessoas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
