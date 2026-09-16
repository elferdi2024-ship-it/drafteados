// filepath: src/lib/supabase/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      seasons: {
        Row: {
          id: string;
          name: string;
          season_year: number;
          status: 'PRESEASON' | 'OPEN' | 'LOCKED' | 'REGULAR' | 'PLAYOFFS' | 'COMPLETE';
          lock_at: string | null;
          start_date: string | null;
          regular_end_date: string | null;
          playoffs_start_date: string | null;
          finals_end_date: string | null;
          rules_version: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          season_year: number;
          status?: 'PRESEASON' | 'OPEN' | 'LOCKED' | 'REGULAR' | 'PLAYOFFS' | 'COMPLETE';
          lock_at?: string | null;
          start_date?: string | null;
          regular_end_date?: string | null;
          playoffs_start_date?: string | null;
          finals_end_date?: string | null;
          rules_version?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          season_year?: number;
          status?: 'PRESEASON' | 'OPEN' | 'LOCKED' | 'REGULAR' | 'PLAYOFFS' | 'COMPLETE';
          lock_at?: string | null;
          start_date?: string | null;
          regular_end_date?: string | null;
          playoffs_start_date?: string | null;
          finals_end_date?: string | null;
          rules_version?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          id: string;
          provider: string;
          provider_team_id: string;
          name: string;
          abbreviation: string;
          conference: 'East' | 'West';
          division: string | null;
          logo_url: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider?: string;
          provider_team_id: string;
          name: string;
          abbreviation: string;
          conference: 'East' | 'West';
          division?: string | null;
          logo_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider?: string;
          provider_team_id?: string;
          name?: string;
          abbreviation?: string;
          conference?: 'East' | 'West';
          division?: string | null;
          logo_url?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      players: {
        Row: {
          id: string;
          provider: string;
          provider_player_id: string;
          first_name: string | null;
          last_name: string | null;
          display_name: string;
          team_id: string | null;
          position: string | null;
          jersey_number: string | null;
          headshot_url: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider?: string;
          provider_player_id: string;
          first_name?: string | null;
          last_name?: string | null;
          display_name: string;
          team_id?: string | null;
          position?: string | null;
          jersey_number?: string | null;
          headshot_url?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider?: string;
          provider_player_id?: string;
          first_name?: string | null;
          last_name?: string | null;
          display_name?: string;
          team_id?: string | null;
          position?: string | null;
          jersey_number?: string | null;
          headshot_url?: string | null;
          active?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      prediction_types: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          category: 'STATS' | 'AWARDS' | 'TEAMS' | 'FINALS';
          phase: 'SEASON' | 'PLAYOFFS' | 'FINALS';
          selection_type: 'player' | 'team';
          points: number;
          active: boolean;
          sort_order: number;
          rules_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          category: 'STATS' | 'AWARDS' | 'TEAMS' | 'FINALS';
          phase?: 'SEASON' | 'PLAYOFFS' | 'FINALS';
          selection_type: 'player' | 'team';
          points: number;
          active?: boolean;
          sort_order?: number;
          rules_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          category?: 'STATS' | 'AWARDS' | 'TEAMS' | 'FINALS';
          phase?: 'SEASON' | 'PLAYOFFS' | 'FINALS';
          selection_type?: 'player' | 'team';
          points?: number;
          active?: boolean;
          sort_order?: number;
          rules_json?: Json;
        };
        Relationships: [];
      };
      predictions: {
        Row: {
          id: string;
          season_id: string;
          prediction_type_id: string;
          user_id: string;
          player_id: string | null;
          team_id: string | null;
          selected_value: string | null;
          status: 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID';
          locked_at: string | null;
          points_awarded: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          season_id: string;
          prediction_type_id: string;
          user_id: string;
          player_id?: string | null;
          team_id?: string | null;
          selected_value?: string | null;
          status?: 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID';
          locked_at?: string | null;
          points_awarded?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          season_id?: string;
          prediction_type_id?: string;
          user_id?: string;
          player_id?: string | null;
          team_id?: string | null;
          selected_value?: string | null;
          status?: 'OPEN' | 'LOCKED' | 'CORRECT' | 'INCORRECT' | 'VOID';
          locked_at?: string | null;
          points_awarded?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "predictions_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "predictions_prediction_type_id_fkey";
            columns: ["prediction_type_id"];
            isOneToOne: false;
            referencedRelation: "prediction_types";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "predictions_season_id_fkey";
            columns: ["season_id"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "predictions_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "predictions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      scoring_events: {
        Row: {
          id: string;
          prediction_id: string;
          user_id: string;
          event_type: string;
          points: number;
          reason: string | null;
          resolution_version: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          prediction_id: string;
          user_id: string;
          event_type: string;
          points: number;
          reason?: string | null;
          resolution_version?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          prediction_id?: string;
          user_id?: string;
          event_type?: string;
          points?: number;
          reason?: string | null;
          resolution_version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "scoring_events_prediction_id_fkey";
            columns: ["prediction_id"];
            isOneToOne: false;
            referencedRelation: "predictions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scoring_events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      leaderboard: {
        Row: {
          user_id: string;
          season_id: string;
          total_points: number;
          correct_predictions: number;
          resolved_predictions: number;
          accuracy: number;
        };
        Relationships: [
          {
            foreignKeyName: "leaderboard_season_id_fkey";
            columns: ["season_id"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leaderboard_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
