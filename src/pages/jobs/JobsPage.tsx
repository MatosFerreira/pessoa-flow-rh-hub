import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobCard } from '@/components/jobs/JobCard';
import { JobForm } from '@/components/jobs/JobForm';
import { jobService, type Job, type JobFormData } from '@/services/jobService';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os status' },
  { value: 'open', label: 'Abertas' },
  { value: 'screening', label: 'Em Triagem' },
  { value: 'interviewing', label: 'Em Entrevistas' },
  { value: 'closed', label: 'Encerradas' },
  { value: 'cancelled', label: 'Canceladas' },
] as const;

export function JobsPage() {
  const [view, setView] = useState<'list' | 'card'>('card');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar vagas",
        description: "Não foi possível carregar as vagas. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateJob = async (data: JobFormData) => {
    try {
      const newJob = await jobService.createJob(data);
      setJobs([newJob, ...jobs]);
      toast({
        title: "Vaga criada",
        description: "A vaga foi criada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao criar vaga",
        description: "Não foi possível criar a vaga. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleEditJob = async (data: JobFormData) => {
    if (!editingJob) return;
    
    try {
      const updatedJob = await jobService.updateJob(editingJob.id, data);
      setJobs(jobs.map(job => job.id === editingJob.id ? updatedJob : job));
      toast({
        title: "Vaga atualizada",
        description: "A vaga foi atualizada com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar vaga",
        description: "Não foi possível atualizar a vaga. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await jobService.deleteJob(id);
      setJobs(jobs.filter(job => job.id !== id));
      toast({
        title: "Vaga excluída",
        description: "A vaga foi excluída com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir vaga",
        description: "Não foi possível excluir a vaga. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const filteredJobs = jobs.filter(job => 
    filterStatus === 'all' ? true : job.status === filterStatus
  );
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Vagas</h1>
        <Button 
          variant="default"
          className="bg-[#df7826] hover:bg-[#c66a22]"
          onClick={() => setIsFormOpen(true)}
        >
          Nova Vaga
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input 
          placeholder="Buscar vagas..." 
          className="w-full"
        />
        <Select
          value={filterStatus}
          onValueChange={setFilterStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
          >
            Lista
          </Button>
          <Button
            variant={view === 'card' ? 'default' : 'outline'}
            onClick={() => setView('card')}
          >
            Cards
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#df7826]"></div>
        </div>
      ) : (
        <div className={view === 'card' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={(id) => {
                const jobToEdit = jobs.find(j => j.id === id);
                if (jobToEdit) {
                  setEditingJob(jobToEdit);
                  setIsFormOpen(true);
                }
              }}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}

      <JobForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingJob(null);
        }}
        onSubmit={editingJob ? handleEditJob : handleCreateJob}
        initialData={editingJob ? {
          ...editingJob,
          requirements: editingJob.requirements.join('\n'),
          benefits: editingJob.benefits.join('\n'),
        } : undefined}
      />
    </div>
  );
} 