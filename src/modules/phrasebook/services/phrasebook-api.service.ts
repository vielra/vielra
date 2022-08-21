// Axios instance
import { http } from '@/utils';

// Interfaces.
import { AxiosResponse } from 'axios';
import { IPhrase, IPhrasebook, IPhraseCategory, IRequestCreatePhrase } from '@/modules/phrasebook/interfaces';

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

  /**
   * @description - Create phrase
   * @params {IRequestCreatePhrase} body
   * @returns Promise<AxiosResponse<IPhrase>>
   */
  createPhrase = async (body: IRequestCreatePhrase): Promise<AxiosResponse<IPhrase>> => {
    return await http.post(PhrasebookApiEndpoints.createPhrase, body);
  };

  /**
   * @description - Get phrase list.
   * @params {Record<string, string | number>} params
   * @returns Promise<AxiosResponse<IPhrase>>
   */
  getPhraseList = async (category?: string): Promise<AxiosResponse<IPhrasebook[] | IPhrasebook>> => {
    return await http.get(PhrasebookApiEndpoints.phraseList, { params: category ? { category } : undefined });
  };

  /**
   * @description - Delete phrase
   * @params {string[]} phrase ids
   * @returns Promise<AxiosResponse<undefined>>
   */
  deletePhrase = async (body: string[]): Promise<AxiosResponse<undefined>> => {
    return await http.post(PhrasebookApiEndpoints.deletePhrase, body);
  };
}

export default new PhrasebookApiService();
