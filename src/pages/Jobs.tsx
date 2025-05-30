
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Share2,
  MoreHorizontal,
  Briefcase
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'CLT' | 'PJ' | 'Estágio' | 'Temporário';
  salary: string;
  status: 'Ativa' | 'Pausada' | 'Encerrada' | 'Rascunho';
  applications: number;
  createdDate: string;
  description: string;
  requirements: string;
  benefits: string;
  manager: string;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isNewJobDialogOpen, setIsNewJobDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'CLT' as const,
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    manager: ''
  });

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Desenvolvedor React Senior',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      status: 'Ativa',
      applications: 45,
      createdDate: '2024-01-15',
      description: 'Procuramos um desenvolvedor React experiente para liderar projetos inovadores.',
      requirements: 'React, TypeScript, Node.js, 5+ anos de experiência',
      benefits: 'Vale refeição, plano de saúde, home office',
      manager: 'João Silva'
    },
    {
      id: '2',
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      salary: 'R$ 4.500 - R$ 6.500',
      status: 'Ativa',
      applications: 28,
      createdDate: '2024-01-18',
      description: 'Responsável por estratégias de marketing digital e campanhas online.',
      requirements: 'Google Ads, Facebook Ads, Analytics, 3+ anos',
      benefits: 'Vale transporte, gympass, flexibilidade',
      manager: 'Maria Santos'
    },
    {
      id: '3',
      title: 'Assistente Administrativo',
      department: 'Administrativo',
      location: 'Belo Horizonte, MG',
      type: 'CLT',
      salary: 'R$ 2.500 - R$ 3.500',
      status: 'Pausada',
      applications: 67,
      createdDate: '2024-01-10',
      description: 'Apoio administrativo geral e atendimento ao cliente.',
      requirements: 'Ensino médio, pacote Office, comunicação',
      benefits: 'Vale refeição, vale transporte',
      manager: 'Pedro Costa'
    },
    {
      id: '4',
      title: 'Designer UX/UI',
      department: 'Design',
      location: 'Remoto',
      type: 'PJ',
      salary: 'R$ 6.000 - R$ 9.000',
      status: 'Rascunho',
      applications: 0,
      createdDate: '2024-01-22',
      description: 'Criação de interfaces e experiências digitais excepcionais.',
      requirements: 'Figma, Adobe XD, portfólio, 4+ anos',
      benefits: 'Projeto remoto, horário flexível',
      manager: 'Ana Oliveira'
    }
  ];

  const departments = ['Tecnologia', 'Marketing', 'Administrativo', 'Design', 'Vendas', 'Financeiro'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
    const matchesStatus = !selectedStatus || job.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pausada': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Encerrada': return 'bg-red-100 text-red-800 border-red-200';
      case 'Rascunho': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateJob = () => {
    // Simular criação de vaga
    console.log('Nova vaga:', newJob);
    setIsNewJobDialogOpen(false);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'CLT',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      manager: ''
    });
    
    toast({
      title: "Vaga criada com sucesso!",
      description: `A vaga "${newJob.title}" foi criada e está ativa.`,
    });
  };

  const handleShareJob = (jobTitle: string) => {
    const url = `${window.location.origin}/vaga/${encodeURIComponent(jobTitle)}/inscricao`;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copiado!",
      description: "O link da vaga foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com ações principais */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas</h1>
          <p className="text-gray-600 mt-1">Crie, gerencie e acompanhe suas oportunidades de trabalho</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros Avançados</span>
          </Button>
          
          <Dialog open={isNewJobDialogOpen} onOpenChange={setIsNewJobDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nova Vaga</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Nova Vaga</DialogTitle>
                <DialogDescription>
                  Preencha as informações da nova oportunidade de trabalho
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Vaga *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Desenvolvedor React Senior"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <Select value={newJob.department} onValueChange={(value) => setNewJob({...newJob, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Ex: São Paulo, SP ou Remoto"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Contrato</Label>
                  <Select value={newJob.type} onValueChange={(value: any) => setNewJob({...newJob, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="PJ">PJ</SelectItem>
                      <SelectItem value="Estágio">Estágio</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Faixa Salarial</Label>
                  <Input
                    id="salary"
                    placeholder="Ex: R$ 5.000 - R$ 8.000"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manager">Responsável</Label>
                  <Input
                    id="manager"
                    placeholder="Nome do gestor responsável"
                    value={newJob.manager}
                    onChange={(e) => setNewJob({...newJob, manager: e.target.value})}
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Descrição da Vaga</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva as principais responsabilidades e objetivos da posição..."
                    rows={3}
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="requirements">Requisitos</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Liste os requisitos técnicos e experiências necessárias..."
                    rows={3}
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="benefits">Benefícios</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Descreva os benefícios oferecidos..."
                    rows={2}
                    value={newJob.benefits}
                    onChange={(e) => setNewJob({...newJob, benefits: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsNewJobDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateJob} className="bg-primary hover:bg-primary/90">
                  Criar Vaga
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                  placeholder="Buscar por título ou departamento..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Ativa">Ativa</SelectItem>
                <SelectItem value="Pausada">Pausada</SelectItem>
                <SelectItem value="Encerrada">Encerrada</SelectItem>
                <SelectItem value="Rascunho">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Vagas */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {/* Header da vaga */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-700 line-clamp-2">{job.description}</p>

                  {/* Métricas */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600">{job.applications}</span> candidatos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Criada em {new Date(job.createdDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Responsável: <span className="font-medium">{job.manager}</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleShareJob(job.title)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma vaga encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Não encontramos vagas com os filtros aplicados.
            </p>
            <Button onClick={() => setIsNewJobDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Vaga
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resumo das vagas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo das Vagas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {jobs.filter(j => j.status === 'Ativa').length}
              </div>
              <p className="text-sm text-gray-600">Ativas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {jobs.filter(j => j.status === 'Pausada').length}
              </div>
              <p className="text-sm text-gray-600">Pausadas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {jobs.reduce((acc, job) => acc + job.applications, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Candidatos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {jobs.filter(j => j.status === 'Rascunho').length}
              </div>
              <p className="text-sm text-gray-600">Rascunhos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Jobs;
