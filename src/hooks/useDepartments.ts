
import { useQuery } from '@tanstack/react-query';
import { departmentsService } from '@/services/departments';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: departmentsService.getDepartments,
  });
};
