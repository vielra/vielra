import { UUID } from '@/modules/common';

/** Request body for create phrase */
export interface IRequestCreatePhrase {
  email: string;
  password: string;
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
  iconName: string;
  iconType: string;
  phrase_count: number;
}
