
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  Video,
  Phone,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  date: string;
  time: string;
  interviewer: string;
  type: 'presencial' | 'online' | 'telefone';
  status: 'agendada' | 'realizada' | 'cancelada';
  location?: string;
  notes?: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'João Silva',
      candidateEmail: 'joao@email.com',
      jobTitle: 'Desenvolvedor React Senior',
      date: '2024-01-25',
      time: '14:00',
      interviewer: 'Ana Costa',
      type: 'online',
      status: 'agendada',
      location: 'Google Meet',
      notes: 'Primeira entrevista técnica'
    },
    {
      id: '2',
      candidateName: 'Maria Santos',
      candidateEmail: 'maria@email.com',
      jobTitle: 'Analista de Marketing',
      date: '2024-01-25',
      time: '15:30',
      interviewer: 'Pedro Lima',
      type: 'presencial',
      status: 'agendada',
      location: 'Sala de Reuniões 1',
      notes: 'Entrevista comportamental'
    },
    {
      id: '3',
      candidateName: 'Carlos Oliveira',
      candidateEmail: 'carlos@email.com',
      jobTitle: 'Desenvolvedor React Senior',
      date: '2024-01-24',
      time: '10:00',
      interviewer: 'Ana Costa',
      type: 'online',
      status: 'realizada',
      location: 'Zoom',
      notes: 'Candidato aprovado para próxima etapa'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: '',
    date: '',
    time: '',
    interviewer: '',
    type: 'online' as const,
    location: '',
    notes: ''
  });

  const candidates = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira'];
  const jobs = ['Desenvolvedor React Senior', 'Analista de Marketing', 'Assistente Administrativo'];
  const interviewers = ['Ana Costa', 'Pedro Lima', 'Carlos Santos', 'Maria Oliveira'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'realizada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'telefone': return <Phone className="h-4 w-4" />;
      case 'presencial': return <MapPin className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || interview.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateInterview = () => {
    if (!newInterview.candidateName || !newInterview.date || !newInterview.time) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos candidato, data e horário",
        variant: "destructive",
      });
      return;
    }

    const interview: Interview = {
      id: Date.now().toString(),
      ...newInterview,
      candidateEmail: 'candidato@email.com',
      status: 'agendada'
    };

    setInterviews([interview, ...interviews]);
    setNewInterview({
      candidateName: '',
      candidateEmail: '',
      jobTitle: '',
      date: '',
      time: '',
      interviewer: '',
      type: 'online',
      location: '',
      notes: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Entrevista agendada!",
      description: `Entrevista com ${interview.candidateName} foi agendada`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrevistas</h1>
          <p className="text-gray-600">Gerencie e acompanhe as entrevistas agendadas</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Entrevista
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nova Entrevista</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar uma nova entrevista
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate">Candidato *</Label>
                  <Select value={newInterview.candidateName} onValueChange={(value) => setNewInterview({...newInterview, candidateName: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o candidato" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map(candidate => (
                        <SelectItem key={candidate} value={candidate}>{candidate}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job">Vaga</Label>
                  <Select value={newInterview.jobTitle} onValueChange={(value) => setNewInterview({...newInterview, jobTitle: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a vaga" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map(job => (
                        <SelectItem key={job} value={job}>{job}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horário *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newInterview.time}
                    onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newInterview.type} onValueChange={(value: any) => setNewInterview({...newInterview, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="telefone">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interviewer">Entrevistador</Label>
                  <Select value={newInterview.interviewer} onValueChange={(value) => setNewInterview({...newInterview, interviewer: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o entrevistador" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewers.map(interviewer => (
                        <SelectItem key={interviewer} value={interviewer}>{interviewer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Local/Link</Label>
                  <Input
                    id="location"
                    placeholder="Ex: Sala 1 ou https://meet.google.com/..."
                    value={newInterview.location}
                    onChange={(e) => setNewInterview({...newInterview, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Adicione observações sobre a entrevista"
                  rows={3}
                  value={newInterview.notes}
                  onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateInterview}>
                  Agendar Entrevista
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
                  placeholder="Buscar por candidato ou vaga..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="agendada">Agendada</SelectItem>
                <SelectItem value="realizada">Realizada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Entrevistas */}
      <div className="grid gap-4">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {interview.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(interview.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                      {interview.interviewer && (
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{interview.interviewer}</span>
                        </div>
                      )}
                    </div>

                    {interview.location && (
                      <p className="text-sm text-gray-600">
                        <strong>Local:</strong> {interview.location}
                      </p>
                    )}

                    {interview.notes && (
                      <p className="text-sm text-gray-600">
                        <strong>Observações:</strong> {interview.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status === 'agendada' ? 'Agendada' :
                     interview.status === 'realizada' ? 'Realizada' : 'Cancelada'}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma entrevista encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Não encontramos entrevistas com os filtros aplicados.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agendar Primeira Entrevista
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Interviews;
