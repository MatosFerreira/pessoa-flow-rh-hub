import { supabase } from '../lib/supabase';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  benefits: string[];
  contractType: string;
  openDate: Date;
  closeDate?: Date;
  status: 'open' | 'screening' | 'interviewing' | 'closed' | 'cancelled';
  department: string;
  company: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  benefits: string;
  contractType: string;
  department: string;
  company: string;
}

export const jobService = {
  async getJobs() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Job[];
  },

  async getJobById(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Job;
  },

  async createJob(jobData: JobFormData) {
    const newJob = {
      ...jobData,
      requirements: jobData.requirements.split('\n').filter(Boolean),
      benefits: jobData.benefits.split('\n').filter(Boolean),
      status: 'open',
      openDate: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('jobs')
      .insert([newJob])
      .select()
      .single();

    if (error) throw error;
    return data as Job;
  },

  async updateJob(id: string, jobData: JobFormData) {
    const updatedJob = {
      ...jobData,
      requirements: jobData.requirements.split('\n').filter(Boolean),
      benefits: jobData.benefits.split('\n').filter(Boolean),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('jobs')
      .update(updatedJob)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Job;
  },

  async deleteJob(id: string) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateJobStatus(id: string, status: Job['status']) {
    const { data, error } = await supabase
      .from('jobs')
      .update({ 
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Job;
  },
}; 