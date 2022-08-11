// Axios instance
import { http } from '@/utils';

// Interfaces.
import { AxiosResponse } from 'axios';
import { IPhraseCategory } from '@/modules/phrasebook/interfaces';

// Phrasebook api endpoints
import { PhrasebookApiEndpoints } from './phrasebook-api-endpoints.enum';

/**
 * Phrasebook api service.
 */
class PhrasebookApiService {
  /**
   * @description - Get phrasebook category list.
   * @returns Promise<AxiosResponse<Array<IPhraseCategory>>>
   */
  getPhraseCategories = async (): Promise<AxiosResponse<Array<IPhraseCategory>>> => {
    return await http.get(PhrasebookApiEndpoints.phrasebookCategory);
  };
}

export default new PhrasebookApiService();
