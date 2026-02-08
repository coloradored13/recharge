export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export type SessionType = 'work' | 'break' | 'long_break';

export type ActivityType =
  | 'breathing_exercise'
  | 'meditation'
  | 'stretch'
  | 'walk'
  | 'journal'
  | 'checkin';

export type Database = {
  public: {
    Tables: {
      user_settings: {
        Row: {
          id: string;
          display_name: string | null;
          pomodoro_work_minutes: number;
          pomodoro_break_minutes: number;
          pomodoro_long_break_minutes: number;
          pomodoros_until_long_break: number;
          sound_enabled: boolean;
          theme: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          pomodoro_work_minutes?: number;
          pomodoro_break_minutes?: number;
          pomodoro_long_break_minutes?: number;
          pomodoros_until_long_break?: number;
          sound_enabled?: boolean;
          theme?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          pomodoro_work_minutes?: number;
          pomodoro_break_minutes?: number;
          pomodoro_long_break_minutes?: number;
          pomodoros_until_long_break?: number;
          sound_enabled?: boolean;
          theme?: string;
          updated_at?: string;
        };
      };
      pomodoro_sessions: {
        Row: {
          id: string;
          user_id: string;
          started_at: string;
          ended_at: string | null;
          duration_minutes: number;
          session_type: SessionType;
          completed: boolean;
          label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          started_at: string;
          ended_at?: string | null;
          duration_minutes: number;
          session_type: SessionType;
          completed?: boolean;
          label?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          started_at?: string;
          ended_at?: string | null;
          duration_minutes?: number;
          session_type?: SessionType;
          completed?: boolean;
          label?: string | null;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          mood: MoodType | null;
          entry_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          mood?: MoodType | null;
          entry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          mood?: MoodType | null;
          entry_date?: string;
          updated_at?: string;
        };
      };
      daily_checkins: {
        Row: {
          id: string;
          user_id: string;
          energy_level: number;
          stress_level: number;
          motivation_level: number;
          notes: string | null;
          checkin_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          energy_level: number;
          stress_level: number;
          motivation_level: number;
          notes?: string | null;
          checkin_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          energy_level?: number;
          stress_level?: number;
          motivation_level?: number;
          notes?: string | null;
          checkin_date?: string;
        };
      };
      recovery_activities: {
        Row: {
          id: string;
          user_id: string;
          activity_type: ActivityType;
          duration_seconds: number | null;
          activity_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_type: ActivityType;
          duration_seconds?: number | null;
          activity_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_type?: ActivityType;
          duration_seconds?: number | null;
          activity_date?: string;
        };
      };
    };
  };
};

// Convenience type aliases
export type UserSettings =
  Database['public']['Tables']['user_settings']['Row'];
export type UserSettingsInsert =
  Database['public']['Tables']['user_settings']['Insert'];
export type UserSettingsUpdate =
  Database['public']['Tables']['user_settings']['Update'];

export type PomodoroSession =
  Database['public']['Tables']['pomodoro_sessions']['Row'];
export type PomodoroSessionInsert =
  Database['public']['Tables']['pomodoro_sessions']['Insert'];
export type PomodoroSessionUpdate =
  Database['public']['Tables']['pomodoro_sessions']['Update'];

export type JournalEntry =
  Database['public']['Tables']['journal_entries']['Row'];
export type JournalEntryInsert =
  Database['public']['Tables']['journal_entries']['Insert'];
export type JournalEntryUpdate =
  Database['public']['Tables']['journal_entries']['Update'];

export type DailyCheckin =
  Database['public']['Tables']['daily_checkins']['Row'];
export type DailyCheckinInsert =
  Database['public']['Tables']['daily_checkins']['Insert'];
export type DailyCheckinUpdate =
  Database['public']['Tables']['daily_checkins']['Update'];

export type RecoveryActivity =
  Database['public']['Tables']['recovery_activities']['Row'];
export type RecoveryActivityInsert =
  Database['public']['Tables']['recovery_activities']['Insert'];
export type RecoveryActivityUpdate =
  Database['public']['Tables']['recovery_activities']['Update'];
