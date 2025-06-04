export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          requirements: string[]
          location: string
          salary: string
          benefits: string[]
          contract_type: string
          open_date: string
          close_date: string | null
          status: 'open' | 'screening' | 'interviewing' | 'closed' | 'cancelled'
          department: string
          company: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          requirements: string[]
          location: string
          salary: string
          benefits: string[]
          contract_type: string
          open_date?: string
          close_date?: string | null
          status?: 'open' | 'screening' | 'interviewing' | 'closed' | 'cancelled'
          department: string
          company: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          requirements?: string[]
          location?: string
          salary?: string
          benefits?: string[]
          contract_type?: string
          open_date?: string
          close_date?: string | null
          status?: 'open' | 'screening' | 'interviewing' | 'closed' | 'cancelled'
          department?: string
          company?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 