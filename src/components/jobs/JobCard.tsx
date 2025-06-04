import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    department: string;
    company: string;
    status: 'open' | 'screening' | 'interviewing' | 'closed' | 'cancelled';
    openDate: Date;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  open: 'bg-green-100 text-green-800',
  screening: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-purple-100 text-purple-800',
  closed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  open: 'Aberta',
  screening: 'Em Triagem',
  interviewing: 'Em Entrevistas',
  closed: 'Encerrada',
  cancelled: 'Cancelada',
};

export function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company} - {job.department}</p>
        </div>
        <Badge className={statusColors[job.status]}>
          {statusLabels[job.status]}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📍 {job.location}</span>
          <span>📅 Aberta em: {formatDate(job.openDate)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(job.id)}
        >
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(job.id)}
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
} 