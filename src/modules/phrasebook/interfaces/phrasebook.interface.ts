import { UUID } from '@/modules/common';

export interface IRequestCreatePhrase {
  category_id: IPhraseCategory['id'];
  text_en: string;
  text_id?: string;
  text_vi?: string;
  notes?: string;
}

export interface IPhrase {
  id: UUID;
  order: number;
  status_id?: number;
  text: {
    en: string;
    id: string;
    vi?: string;
  };
  notes?: string;
}

// Phrase category
export interface IPhraseCategory {
  id: UUID;
  name: {
    en: string;
    id: string;
    vi?: string;
  };
  slug: string;
  color: string;
  icon_name: string;
  icon_type: string;
  phrases_count: number;
}

export interface IPhrasebook {
  category: IPhraseCategory;
  phrases: Array<IPhrase>;
}
