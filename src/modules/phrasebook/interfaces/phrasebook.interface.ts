import { UUID } from '@/modules/common/interfaces';

export interface IRequestCreatePhrase {
  category_id: IPhraseCategory['id'];
  text_en: string;
  text_id?: string;
  text_vi?: string;
  notes?: string;
}

export interface IPhraseAudio {
  id: UUID;
  audio_url: string | null;
  mime: string;
  locale: string;
  voice_code: string;
  user_id?: string | null;
  created_at?: string | null;
}

export interface IPhrase {
  id: UUID;
  order: number;
  status_id?: number;
  text: {
    vi: string | null;
    en?: string | null;
    id?: string | null;
  };
  notes?: string;
  audios: Array<IPhraseAudio>;
}

// Phrase category
export interface IPhraseCategory {
  id: UUID;
  name: {
    vi: string | null;
    en?: string | null;
    id?: string | null;
  };
  slug: string;
  color: string;
  icon_name: string | null;
  icon_type: string | null;
  order: number;
  is_active?: boolean;
  phrases_count: number;
}

export interface IPhrasebook {
  category: IPhraseCategory;
  phrases: Array<IPhrase>;
}
