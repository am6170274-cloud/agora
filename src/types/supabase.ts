export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_reports: {
        Row: {
          created_at: string | null
          id: string
          project_name: string
          score: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_name: string
          score?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          project_name?: string
          score?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          balance: number | null
          id: string
          updated_at: string | null
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          balance?: number | null
          id: string
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          balance?: number | null
          id?: string
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          creator_id: string | null
          creator_name: string | null
          credibility_score: number | null
          description: string | null
          equity: number | null
          goal: number | null
          id: string
          image_url: string | null
          moderation_status: string | null
          price: number | null
          raised: number | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          creator_name?: string | null
          credibility_score?: number | null
          description?: string | null
          equity?: number | null
          goal?: number | null
          id?: string
          image_url?: string | null
          moderation_status?: string | null
          price?: number | null
          raised?: number | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          creator_name?: string | null
          credibility_score?: number | null
          description?: string | null
          equity?: number | null
          goal?: number | null
          id?: string
          image_url?: string | null
          moderation_status?: string | null
          price?: number | null
          raised?: number | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_logs: {
        Row: {
          created_at: string | null
          event: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}