import { useAppSelector } from '@/plugins/redux';

// app slice
import {
  phrasebook_selector,
  phrasebook_reducerActions,
  phrasebookApi,
  phrasebookPersisted_selector,
  phrasebookPersisted_reducerActions,
} from '@/modules/phrasebook/redux';

export const usePhrasebook = () => {
  const phrasebookState = useAppSelector(phrasebook_selector);
  const phrasebookPersistedState = useAppSelector(phrasebookPersisted_selector);

  const [
    phrasebook_getListCategory,
    { isLoading: phrasebook_getListCategoryIsLoading, data: phrasebook_getListCategoryData },
  ] = phrasebookApi.useLazyGetListPhraseCategoryQuery();

  const [
    phrasebook_getListPhrase,
    { isLoading: phrasebook_getListPhraseIsLoading, data: phrasebook_getListPhraseData },
  ] = phrasebookApi.useLazyGetListPhraseQuery();

  const [phrasebook_create, { isLoading: phrasebook_createIsLoading, error: phrasebook_createError }] =
    phrasebookApi.useCreatePhraseMutation();

  return {
    ...phrasebookState,
    ...phrasebook_reducerActions,
    ...phrasebookPersistedState,
    ...phrasebookPersisted_reducerActions,
    phrasebook_getListCategory,
    phrasebook_getListCategoryData,
    phrasebook_getListCategoryIsLoading,

    phrasebook_getListPhrase,
    phrasebook_getListPhraseIsLoading,
    phrasebook_getListPhraseData,
    phrasebook_create,
    phrasebook_createIsLoading,
    phrasebook_createError,
  };
};
