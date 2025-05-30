
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar,
  TrendingUp,
  Clock,
  Target,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  // Dados mockados para demonstração
  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalCandidates: 145,
    newCandidates: 23,
    scheduledInterviews: 15,
    todayInterviews: 5,
    employees: 85,
    pendingTasks: 7
  };

  const recentJobs = [
    { id: 1, title: 'Desenvolvedor React', candidates: 18, status: 'Ativa', department: 'Tecnologia' },
    { id: 2, title: 'Analista de Marketing', candidates: 12, status: 'Ativa', department: 'Marketing' },
    { id: 3, title: 'Assistente Administrativo', candidates: 8, status: 'Pausada', department: 'Administrativo' },
  ];

  const upcomingInterviews = [
    { id: 1, candidate: 'João Silva', job: 'Desenvolvedor React', time: '14:00', type: 'Presencial' },
    { id: 2, candidate: 'Maria Santos', job: 'Analista de Marketing', time: '15:30', type: 'Online' },
    { id: 3, candidate: 'Pedro Costa', job: 'Desenvolvedor React', time: '16:00', type: 'Online' },
  ];

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vagas Ativas
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.activeJobs}</div>
            <p className="text-xs text-green-600 font-medium">
              +2 novas esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Candidatos
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</div>
            <p className="text-xs text-green-600 font-medium">
              +{stats.newCandidates} novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Entrevistas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.todayInterviews}</div>
            <p className="text-xs text-blue-600 font-medium">
              {stats.scheduledInterviews} agendadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Colaboradores
            </CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.employees}</div>
            <p className="text-xs text-gray-600">
              Ativos na empresa
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vagas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Vagas Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas vagas criadas e seu status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.department}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{job.candidates}</p>
                      <p className="text-xs text-gray-500">candidatos</p>
                    </div>
                    <Badge 
                      variant={job.status === 'Ativa' ? 'default' : 'secondary'}
                      className={job.status === 'Ativa' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Entrevistas do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Entrevistas de Hoje</span>
            </CardTitle>
            <CardDescription>
              Próximas entrevistas agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                    <p className="text-sm text-gray-600">{interview.job}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {interview.type}
                      </Badge>
                    </div>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas do Funil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Métricas do Funil de Seleção</span>
          </CardTitle>
          <CardDescription>
            Performance do processo seletivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">145</div>
              <p className="text-sm text-gray-600">Candidatos Inscritos</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">67</div>
              <p className="text-sm text-gray-600">Em Triagem</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">23</div>
              <p className="text-sm text-gray-600">Em Entrevista</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <p className="text-sm text-gray-600">Contratados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Tarefas Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <span>Alertas e Tarefas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-800">
                  3 entrevistas precisam ser reagendadas
                </p>
                <p className="text-xs text-orange-600">
                  Conflitos de horário identificados
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  5 candidatos aguardando feedback
                </p>
                <p className="text-xs text-blue-600">
                  Mais de 3 dias sem resposta
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
