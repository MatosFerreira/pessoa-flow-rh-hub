
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  appliedJob: string;
  appliedDate: string;
  status: 'Novo' | 'Triagem' | 'Entrevista' | 'Teste' | 'Proposta' | 'Contratado' | 'Recusado';
  rating: number;
  experience: string;
  resumeUrl?: string;
}

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      location: 'São Paulo, SP',
      appliedJob: 'Desenvolvedor React Senior',
      appliedDate: '2024-01-20',
      status: 'Entrevista',
      rating: 4,
      experience: '5 anos',
      resumeUrl: '#'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      location: 'Rio de Janeiro, RJ',
      appliedJob: 'Analista de Marketing Digital',
      appliedDate: '2024-01-18',
      status: 'Triagem',
      rating: 5,
      experience: '3 anos'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      phone: '(11) 77777-7777',
      location: 'Belo Horizonte, MG',
      appliedJob: 'Desenvolvedor React Senior',
      appliedDate: '2024-01-15',
      status: 'Proposta',
      rating: 4,
      experience: '4 anos'
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      phone: '(11) 66666-6666',
      location: 'São Paulo, SP',
      appliedJob: 'Assistente Administrativo',
      appliedDate: '2024-01-12',
      status: 'Novo',
      rating: 3,
      experience: '2 anos'
    }
  ];

  const jobs = ['Desenvolvedor React Senior', 'Analista de Marketing Digital', 'Assistente Administrativo'];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = !selectedJob || candidate.appliedJob === selectedJob;
    const matchesStatus = !selectedStatus || candidate.status === selectedStatus;
    
    return matchesSearch && matchesJob && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Triagem': return 'bg-yellow-100 text-yellow-800';
      case 'Entrevista': return 'bg-orange-100 text-orange-800';
      case 'Teste': return 'bg-purple-100 text-purple-800';
      case 'Proposta': return 'bg-indigo-100 text-indigo-800';
      case 'Contratado': return 'bg-green-100 text-green-800';
      case 'Recusado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSendEmail = (candidateEmail: string) => {
    toast({
      title: "E-mail enviado",
      description: `E-mail enviado para ${candidateEmail}`,
    });
  };

  const handleDownloadResume = (candidateName: string) => {
    toast({
      title: "Download iniciado",
      description: `Fazendo download do currículo de ${candidateName}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidatos</h1>
          <p className="text-gray-600">Gerencie todos os candidatos às vagas da sua empresa</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Todas as vagas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as vagas</SelectItem>
                {jobs.map(job => (
                  <SelectItem key={job} value={job}>{job}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Novo">Novo</SelectItem>
                <SelectItem value="Triagem">Triagem</SelectItem>
                <SelectItem value="Entrevista">Entrevista</SelectItem>
                <SelectItem value="Teste">Teste</SelectItem>
                <SelectItem value="Proposta">Proposta</SelectItem>
                <SelectItem value="Contratado">Contratado</SelectItem>
                <SelectItem value="Recusado">Recusado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Candidatos */}
      <div className="grid gap-4">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Informações principais */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.appliedJob}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(candidate.rating)}
                      </div>
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Detalhes do candidato */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Aplicou em {new Date(candidate.appliedDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Experiência */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700">Experiência:</span>
                    <span className="text-gray-600">{candidate.experience}</span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSendEmail(candidate.email)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contatar
                  </Button>
                  {candidate.resumeUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadResume(candidate.name)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Currículo
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum candidato encontrado
            </h3>
            <p className="text-gray-600">
              Não encontramos candidatos com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Resumo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo dos Candidatos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{candidates.length}</div>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {candidates.filter(c => c.status === 'Novo' || c.status === 'Triagem').length}
              </div>
              <p className="text-sm text-gray-600">Em Análise</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {candidates.filter(c => c.status === 'Entrevista' || c.status === 'Teste').length}
              </div>
              <p className="text-sm text-gray-600">Em Processo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {candidates.filter(c => c.status === 'Proposta' || c.status === 'Contratado').length}
              </div>
              <p className="text-sm text-gray-600">Finalizados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Candidates;
