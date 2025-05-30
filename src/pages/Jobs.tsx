
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  Share,
  MoreHorizontal
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'CLT' | 'PJ' | 'Estagio' | 'Temporario';
  status: 'Ativa' | 'Pausada' | 'Finalizada';
  salary: string;
  candidates: number;
  createdAt: string;
  description: string;
  requirements: string;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Desenvolvedor React Senior',
      department: 'Tecnologia',
      location: 'São Paulo, SP',
      type: 'CLT',
      status: 'Ativa',
      salary: 'R$ 8.000 - R$ 12.000',
      candidates: 18,
      createdAt: '2024-01-15',
      description: 'Vaga para desenvolvedor React senior com experiência em TypeScript.',
      requirements: 'React, TypeScript, Next.js, 3+ anos de experiência'
    },
    {
      id: '2',
      title: 'Analista de Marketing Digital',
      department: 'Marketing',
      location: 'Remoto',
      type: 'CLT',
      status: 'Ativa',
      salary: 'R$ 4.000 - R$ 6.000',
      candidates: 12,
      createdAt: '2024-01-10',
      description: 'Responsável por campanhas de marketing digital e análise de métricas.',
      requirements: 'Google Ads, Facebook Ads, Analytics, 2+ anos de experiência'
    },
    {
      id: '3',
      title: 'Assistente Administrativo',
      department: 'Administrativo',
      location: 'Rio de Janeiro, RJ',
      type: 'CLT',
      status: 'Pausada',
      salary: 'R$ 2.500 - R$ 3.500',
      candidates: 8,
      createdAt: '2024-01-05',
      description: 'Apoio às atividades administrativas e atendimento ao cliente.',
      requirements: 'Ensino médio completo, conhecimento em Excel'
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'CLT' as const,
    salary: '',
    description: '',
    requirements: ''
  });

  const departments = ['Tecnologia', 'Marketing', 'Administrativo', 'Vendas', 'RH', 'Financeiro'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
    const matchesStatus = !selectedStatus || job.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.department) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos o título e departamento da vaga",
        variant: "destructive",
      });
      return;
    }

    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      status: 'Ativa',
      candidates: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setJobs([job, ...jobs]);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'CLT',
      salary: '',
      description: '',
      requirements: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Vaga criada com sucesso!",
      description: `A vaga "${job.title}" foi publicada`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800';
      case 'Pausada': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const generatePublicLink = (jobId: string) => {
    const link = `${window.location.origin}/vaga/${jobId}/inscricao`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link público da vaga foi copiado para a área de transferência",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Vagas</h1>
          <p className="text-gray-600">Crie, edite e gerencie as vagas da sua empresa</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Vaga
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Vaga</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova vaga de emprego
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Vaga *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Desenvolvedor React"
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="Estagio">Estágio</SelectItem>
                      <SelectItem value="Temporario">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <Label htmlFor="description">Descrição da Vaga</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva as responsabilidades e atividades da vaga"
                  rows={3}
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos</Label>
                <Textarea
                  id="requirements"
                  placeholder="Liste os conhecimentos e experiências necessárias"
                  rows={3}
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateJob}>
                  Criar Vaga
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                <SelectValue placeholder="Todos os departamentos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os departamentos</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="Ativa">Ativa</SelectItem>
                <SelectItem value="Pausada">Pausada</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Vagas */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {job.department} • {job.type}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => generatePublicLink(job.id)}>
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{job.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {job.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Criada em {new Date(job.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      {job.candidates} candidatos
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Candidatos
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Gerenciar Vaga
                    </Button>
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
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Vaga
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Jobs;
