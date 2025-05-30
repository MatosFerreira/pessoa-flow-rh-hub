
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus,
  MessageSquare,
  Star,
  Calendar,
  User,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  appliedJob: string;
  rating: number;
  appliedDate: string;
  notes: string[];
}

interface Stage {
  id: string;
  name: string;
  color: string;
  candidates: Candidate[];
}

const Pipeline = () => {
  const [selectedJob, setSelectedJob] = useState('Desenvolvedor React Senior');
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [newNote, setNewNote] = useState('');

  const jobs = ['Desenvolvedor React Senior', 'Analista de Marketing Digital', 'Assistente Administrativo'];

  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'triagem',
      name: 'Triagem',
      color: 'bg-blue-100 border-blue-300',
      candidates: [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          appliedJob: 'Desenvolvedor React Senior',
          rating: 4,
          appliedDate: '2024-01-20',
          notes: ['Perfil interessante', 'Boa experiência com React']
        },
        {
          id: '2',
          name: 'Ana Costa',
          email: 'ana@email.com',
          appliedJob: 'Desenvolvedor React Senior',
          rating: 3,
          appliedDate: '2024-01-18',
          notes: ['Candidata júnior']
        }
      ]
    },
    {
      id: 'entrevista',
      name: 'Entrevista',
      color: 'bg-yellow-100 border-yellow-300',
      candidates: [
        {
          id: '3',
          name: 'Pedro Santos',
          email: 'pedro@email.com',
          appliedJob: 'Desenvolvedor React Senior',
          rating: 5,
          appliedDate: '2024-01-15',
          notes: ['Ótima entrevista técnica', 'Conhece bem TypeScript']
        }
      ]
    },
    {
      id: 'teste',
      name: 'Teste Técnico',
      color: 'bg-orange-100 border-orange-300',
      candidates: [
        {
          id: '4',
          name: 'Maria Oliveira',
          email: 'maria@email.com',
          appliedJob: 'Desenvolvedor React Senior',
          rating: 4,
          appliedDate: '2024-01-12',
          notes: ['Teste técnico agendado para amanhã']
        }
      ]
    },
    {
      id: 'proposta',
      name: 'Proposta',
      color: 'bg-purple-100 border-purple-300',
      candidates: [
        {
          id: '5',
          name: 'Carlos Lima',
          email: 'carlos@email.com',
          appliedJob: 'Desenvolvedor React Senior',
          rating: 5,
          appliedDate: '2024-01-10',
          notes: ['Proposta enviada', 'Aguardando resposta']
        }
      ]
    },
    {
      id: 'contratado',
      name: 'Contratado',
      color: 'bg-green-100 border-green-300',
      candidates: []
    }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const moveCandidate = (candidateId: string, fromStageId: string, toStageId: string) => {
    setStages(prevStages => {
      const newStages = [...prevStages];
      const fromStage = newStages.find(stage => stage.id === fromStageId);
      const toStage = newStages.find(stage => stage.id === toStageId);
      
      if (fromStage && toStage) {
        const candidateIndex = fromStage.candidates.findIndex(c => c.id === candidateId);
        if (candidateIndex > -1) {
          const candidate = fromStage.candidates.splice(candidateIndex, 1)[0];
          toStage.candidates.push(candidate);
          
          toast({
            title: "Candidato movido",
            description: `${candidate.name} foi movido para ${toStage.name}`,
          });
        }
      }
      
      return newStages;
    });
  };

  const addNote = () => {
    if (!selectedCandidate || !newNote.trim()) return;

    setStages(prevStages => {
      const newStages = [...prevStages];
      const stage = newStages.find(s => s.candidates.some(c => c.id === selectedCandidate.id));
      if (stage) {
        const candidate = stage.candidates.find(c => c.id === selectedCandidate.id);
        if (candidate) {
          candidate.notes.push(newNote);
        }
      }
      return newStages;
    });

    setNewNote('');
    setIsNoteDialogOpen(false);
    
    toast({
      title: "Nota adicionada",
      description: "A nota foi adicionada ao perfil do candidato",
    });
  };

  const CandidateCard = ({ candidate, stageId }: { candidate: Candidate; stageId: string }) => (
    <Card className="mb-3 cursor-move hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
              {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{candidate.name}</h4>
              <p className="text-xs text-gray-600">{candidate.email}</p>
            </div>
            
            <div className="flex items-center space-x-1">
              {renderStars(candidate.rating)}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {new Date(candidate.appliedDate).toLocaleDateString('pt-BR')}
              </span>
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setIsNoteDialogOpen(true);
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
                
                {stageId !== 'contratado' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => {
                      const currentStageIndex = stages.findIndex(s => s.id === stageId);
                      if (currentStageIndex < stages.length - 1) {
                        const nextStageId = stages[currentStageIndex + 1].id;
                        moveCandidate(candidate.id, stageId, nextStageId);
                      }
                    }}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            {candidate.notes.length > 0 && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <p className="truncate">{candidate.notes[candidate.notes.length - 1]}</p>
                {candidate.notes.length > 1 && (
                  <span className="text-gray-500">+{candidate.notes.length - 1} nota(s)</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline de Seleção</h1>
          <p className="text-gray-600">Visualize e gerencie candidatos no funil de seleção</p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {jobs.map(job => (
                <SelectItem key={job} value={job}>{job}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Nova Etapa
          </Button>
        </div>
      </div>

      {/* Pipeline Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {stages.map((stage) => (
          <Card key={stage.id} className={`${stage.color} min-h-96`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stage.name}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {stage.candidates.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {stage.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    stageId={stage.id}
                  />
                ))}
                
                {stage.candidates.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum candidato</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas do Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas do Pipeline</CardTitle>
          <CardDescription>Métricas da vaga: {selectedJob}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stages.map((stage, index) => {
              const total = stages.reduce((acc, s) => acc + s.candidates.length, 0);
              const percentage = total > 0 ? Math.round((stage.candidates.length / total) * 100) : 0;
              
              return (
                <div key={stage.id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{stage.candidates.length}</div>
                  <p className="text-sm text-gray-600">{stage.name}</p>
                  <p className="text-xs text-gray-500">{percentage}% do total</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para adicionar notas */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nota</DialogTitle>
            <DialogDescription>
              Adicione uma nota sobre {selectedCandidate?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCandidate && (
            <div className="space-y-4">
              {/* Notas existentes */}
              {selectedCandidate.notes.length > 0 && (
                <div className="space-y-2">
                  <Label>Notas anteriores:</Label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selectedCandidate.notes.map((note, index) => (
                      <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Nova nota */}
              <div className="space-y-2">
                <Label htmlFor="note">Nova nota:</Label>
                <Textarea
                  id="note"
                  placeholder="Digite sua observação sobre o candidato..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={addNote} disabled={!newNote.trim()}>
                  Adicionar Nota
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pipeline;
