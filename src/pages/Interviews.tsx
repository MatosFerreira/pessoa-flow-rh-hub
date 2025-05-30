
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  User,
  Mail,
  Phone,
  Edit,
  Trash2,
  Send
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  date: Date;
  time: string;
  type: 'Presencial' | 'Online' | 'Telefone';
  location: string;
  interviewer: string;
  status: 'Agendada' | 'Realizada' | 'Cancelada' | 'Reagendada';
  notes: string;
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'João Silva',
      candidateEmail: 'joao@email.com',
      jobTitle: 'Desenvolvedor React Senior',
      date: new Date(2024, 0, 25),
      time: '14:00',
      type: 'Online',
      location: 'Google Meet',
      interviewer: 'Maria Santos',
      status: 'Agendada',
      notes: 'Primeira entrevista técnica'
    },
    {
      id: '2',
      candidateName: 'Ana Costa',
      candidateEmail: 'ana@email.com',
      jobTitle: 'Analista de Marketing',
      date: new Date(2024, 0, 25),
      time: '15:30',
      type: 'Presencial',
      location: 'Sala de Reunião A',
      interviewer: 'Pedro Lima',
      status: 'Agendada',
      notes: 'Entrevista comportamental'
    },
    {
      id: '3',
      candidateName: 'Carlos Oliveira',
      candidateEmail: 'carlos@email.com',
      jobTitle: 'Desenvolvedor React Senior',
      date: new Date(2024, 0, 24),
      time: '10:00',
      type: 'Online',
      location: 'Zoom',
      interviewer: 'Maria Santos',
      status: 'Realizada',
      notes: 'Ótima entrevista, candidato aprovado para próxima fase'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: '',
    time: '',
    type: 'Online' as const,
    location: '',
    interviewer: '',
    notes: ''
  });

  const candidates = ['João Silva', 'Ana Costa', 'Pedro Santos', 'Maria Oliveira'];
  const jobs = ['Desenvolvedor React Senior', 'Analista de Marketing', 'Assistente Administrativo'];
  const interviewers = ['Maria Santos', 'Pedro Lima', 'João Costa', 'Ana Silva'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada': return 'bg-blue-100 text-blue-800';
      case 'Realizada': return 'bg-green-100 text-green-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      case 'Reagendada': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Online': return <Video className="h-4 w-4" />;
      case 'Presencial': return <MapPin className="h-4 w-4" />;
      case 'Telefone': return <Phone className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const handleCreateInterview = () => {
    if (!newInterview.candidateName || !newInterview.jobTitle || !selectedDate || !newInterview.time) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const interview: Interview = {
      id: Date.now().toString(),
      ...newInterview,
      candidateEmail: newInterview.candidateEmail || `${newInterview.candidateName.toLowerCase().replace(' ', '.')}@email.com`,
      date: selectedDate,
      status: 'Agendada'
    };

    setInterviews([interview, ...interviews]);
    setNewInterview({
      candidateName: '',
      candidateEmail: '',
      jobTitle: '',
      time: '',
      type: 'Online',
      location: '',
      interviewer: '',
      notes: ''
    });
    setSelectedDate(undefined);
    setIsCreateDialogOpen(false);

    toast({
      title: "Entrevista agendada!",
      description: `Entrevista com ${interview.candidateName} foi agendada para ${format(interview.date, 'dd/MM/yyyy', { locale: ptBR })} às ${interview.time}`,
    });
  };

  const sendNotification = (interview: Interview) => {
    toast({
      title: "Notificação enviada",
      description: `E-mail de lembrete enviado para ${interview.candidateName}`,
    });
  };

  const updateStatus = (interviewId: string, newStatus: Interview['status']) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId 
        ? { ...interview, status: newStatus }
        : interview
    ));

    toast({
      title: "Status atualizado",
      description: `Status da entrevista alterado para ${newStatus}`,
    });
  };

  // Filtrar entrevistas por data
  const today = new Date();
  const todayInterviews = interviews.filter(interview => 
    interview.date.toDateString() === today.toDateString()
  );
  const upcomingInterviews = interviews.filter(interview => 
    interview.date > today
  );
  const pastInterviews = interviews.filter(interview => 
    interview.date < today || interview.status === 'Realizada'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrevistas</h1>
          <p className="text-gray-600">Gerencie e acompanhe todas as entrevistas agendadas</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Entrevista
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agendar Nova Entrevista</DialogTitle>
              <DialogDescription>
                Preencha os dados para agendar uma nova entrevista
              </DialogDescription>
            </DialogHeader>
            
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
                <Label htmlFor="job">Vaga *</Label>
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

              <div className="space-y-2">
                <Label>Data *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
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
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Telefone">Telefone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Local/Link</Label>
                <Input
                  id="location"
                  placeholder="Ex: Sala de Reunião A ou https://meet.google.com/..."
                  value={newInterview.location}
                  onChange={(e) => setNewInterview({...newInterview, location: e.target.value})}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Notas adicionais sobre a entrevista"
                  rows={3}
                  value={newInterview.notes}
                  onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateInterview}>
                Agendar Entrevista
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Entrevistas de Hoje */}
      {todayInterviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span>Entrevistas de Hoje</span>
            </CardTitle>
            <CardDescription>
              {todayInterviews.length} entrevista(s) agendada(s) para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {interview.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                      <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                      <p className="text-sm text-blue-700 font-medium">{interview.time} • {interview.interviewer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => sendNotification(interview)}>
                      <Send className="h-4 w-4 mr-2" />
                      Notificar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximas Entrevistas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Entrevistas</CardTitle>
          <CardDescription>
            Entrevistas agendadas para os próximos dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-gray-100 text-gray-700">
                      {interview.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                    <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(interview.date, 'dd/MM/yyyy', { locale: ptBR })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(interview.type)}
                        <span>{interview.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{interview.interviewer}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => sendNotification(interview)}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {upcomingInterviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma entrevista agendada</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Entrevistas Realizadas */}
      <Card>
        <CardHeader>
          <CardTitle>Entrevistas Realizadas</CardTitle>
          <CardDescription>
            Histórico de entrevistas concluídas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastInterviews.slice(0, 5).map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {interview.candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{interview.candidateName}</h4>
                    <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                    <p className="text-xs text-gray-500">
                      {format(interview.date, 'dd/MM/yyyy', { locale: ptBR })} às {interview.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Interviews;
